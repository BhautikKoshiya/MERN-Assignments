import React, {useState} from "react";

import CompanyBranding from "./components/companyBranding";
import SignupForm from "./components/SignupFormSide";

import "./Signup.scss";

const Signup = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  const handleSignInChange = (newValue) => {
    setIsSignIn(newValue);
  };
  
  return (
    <div className="signup-wrapper">
      <CompanyBranding onSignInChange={handleSignInChange}/>
      <SignupForm isSignIn={isSignIn}/>

    </div>
  );
};

export default Signup;
