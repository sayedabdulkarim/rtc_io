import React from "react";
import CustomPrimaryButton from "../CustomPrimaryButton";
import RedirectInfo from "../RedirectInfo";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { Tooltip } from "@mui/material";

const getFormNotValidMessage = () => {
  return "Username should contains between 3 and 12 characters and password should contains between 6 and 12 character. Also correct e-mail address should provided";
};

const getFormValidMessage = () => {
  return "Press to register!";
};

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate(); // Instantiate navigate function

  const handlePushToLoginPage = () => {
    navigate("/login");
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text=""
        redirectText="Already have an account ?"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;
