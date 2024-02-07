import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const SignupForm = ({isSignIn}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (firstName && lastName && email && password && organization) {
      alert("Form submitted successfully!");
    } else {
      alert("Please fill in all required fields!");
    }
  };

  const handleSubmitSignIn = (event) => {
    event.preventDefault(); 
    if (email && password) {
      alert("Logged In successfully!");
    } else {
      alert("Please fill in all required fields!");
    }
  };


  return (
    <>
    <h2 className="create-account-title">{isSignIn ? "LOG IN TO ISSUESTACK" : "CREATE ACCOUNT"}</h2>
    {isSignIn ? (
        <div>
      <div className="signup-form">

        <div className="input-field-wrapper email-field-wrapper">
          <TextField label="Email" variant="outlined" className="input-field" required value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="input-field-wrapper password-field-wrapper">
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
      </div>
      <div className="signup-button-wrapper">
          <Button variant="outlined" size="large" className="signup-button" onClick={handleSubmitSignIn}>
            SIGN IN
          </Button>
      </div>
        </div>
    ):(
    <div>
      <div className="signup-form">
        <div className="input-field-wrapper name-field-wrapper">
          <TextField
            label="First Name"
            variant="outlined"
            className="input-field"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            className="input-field"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            />
        </div>
        <div className="input-field-wrapper email-field-wrapper">
          <TextField label="Email" variant="outlined" className="input-field" required value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="input-field-wrapper password-field-wrapper">
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </div>
        <div className="input-field-wrapper organization-field-wrapper">
          <TextField
            label="Organization Name"
            variant="outlined"
            className="input-field"
            required
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            />
        </div>
  
      </div>
      <div className="signup-button-wrapper">
          <Button variant="outlined" size="large" className="signup-button" onClick={handleSubmit}>
            SIGN UP
          </Button>
      </div>
    </div>
    )}
    
</>
  );
};

export default SignupForm;
