import React, { useState } from "react";
import { Button } from "@mui/material";
import LogoImage from "../../../../../assets/logo.jpeg";

const CompanyBranding = ({ onSignInChange }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    // Toggle the value and pass it to the parent component
    onSignInChange((prevIsSignIn) => !prevIsSignIn);
    setIsSignedIn(!isSignedIn);
  }; 
   const buttonText = isSignedIn ? "SIGN OUT" : "SIGN IN";


  return (
    <div className="company-branding-wrapper">
      <div className="logo-wrapper">
        <img src={LogoImage} className="logo" alt="logo of website" />
      </div>
      {/* <h1 className="logo">ISSUESTACK</h1> */}
      <h2 className="title-text">
        Empowering collaboration, streamlining workflows, and fostering
        innovation
      </h2>
      <Button variant="outlined" size="large" className="signin-button" onClick={handleSignIn}>
      {buttonText}
      </Button>
    </div>
  );
};

export default CompanyBranding;
