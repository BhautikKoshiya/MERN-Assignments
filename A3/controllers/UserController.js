const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "csci5708group15@gmail.com",
        pass: "hiry kpkt qrzc ignb"
    },
    tls: {
        rejectUnauthorized: false
    }
})

const SignUp = async (req, res) => {
    try{

        const {name, email, password, role} = req.body;

        const isUserExists = await User.findOne({ email });

        if(isUserExists){
            return res.status(400).json({ error: "User with this email already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
        })

        await user.save();
        const mailOptions = {
            from: process.env.USERNAME, 
            to: email, 
            subject: 'Registration Successful', 
            text: 'You received this email as you are just registered with the IssueStack, Welcome to the IssueStack community!'  
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error('Error occurred:', error.message);
            }else {
                console.log('Email sent successfully!');
                console.log('Message ID:', info.messageId);
            }
        })

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        const userWithoutPassword = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        res.json({token, user: userWithoutPassword });
    }catch{
        console.error(error.message)
        res.status(500).send('Server Error');
    }
}

const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "Invalid email or password"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid email or password"});
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        const currentDate = new Date();

        const mailOptions = {
            from: process.env.USERNAME, 
            to: email, 
            subject: 'Login Successful', 
            text: `Last Login time: ${currentDate}`  
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error('Error occurred:', error.message);
            }else {
                console.log('Email sent successfully!');
                console.log('Message ID:', info.messageId);
            }
        })

        const userWithoutPassword = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        res.json({token, user: userWithoutPassword });
    }catch (error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }   
}


const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
        const URL = `https://csci5709-web-project.netlify.app/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: process.env.USERNAME, 
            to: email, 
            subject: 'Reset Password', 
            text: `To reset your password please follow the below link, it is valid till 10 minutes only. ${URL}` 
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error('Error occurred:', error.message);
            }else {
                console.log('Email sent successfully!');
                console.log('Message ID:', info.messageId);
            }
        })

        user.resetToken = resetToken;
        await user.save();

        res.json({ message: 'Reset link sent to your email' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

const ResetPassword = async (req, res) => {
    try {
        const {resetToken, newPassword} = req.body;
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if(user.resetToken && user.resetToken != null){ 
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            user.password = hashedPassword;
            user.resetToken = null;
            await user.save();
        }else{
            return res.status(404).json({ message: 'Reset Password link is expired.'})
        }
        const mailOptions = {
            from: process.env.USERNAME, 
            to: user.email, 
            subject: 'Reset Password', 
            text: `Password reset successfully.`
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.error('Error occurred:', error.message);
            }else {
                console.log('Email sent successfully!');
                console.log('Message ID:', info.messageId);
            }
        })
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    SignUp,
    SignIn,
    ForgotPassword,
    ResetPassword
};
