import React from "react";
import SignupForm from "./SignupForm";

const SignupFormSide = ( {isSignIn } ) => {

console.log("issindin", isSignIn);
  // const isSignIn = localStorage.getItem("isSignIn")
  // console.log("insi", isSignIn);
  return (
    <div className="signup-form-side-wrapper">


      <SignupForm isSignIn={isSignIn}/>
 
    </div>
  );
};

export default SignupFormSide;
