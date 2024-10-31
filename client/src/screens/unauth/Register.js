import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import AuthBox from "../../shared/components/AuthBox";
import RegisterPageInputs from "../../shared/components/register/RegisterPageInputs";
import RegisterPageFooter from "../../shared/components/register/RegisterPageFooter";
import { validateRegisterForm } from "../../shared/utils/validators";
// import { useHistory } from "react-router-dom";

const RegisterPage = ({ register }) => {
  //   const history = useHistory();

  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const handleRegister = () => {
    const userDetails = {
      mail,
      password,
      username,
    };

    console.log(userDetails, " det");

    // register(userDetails, history);
  };

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({
        mail,
        username,
        password,
      })
    );
  }, [mail, username, password, setIsFormValid]);

  return (
    <AuthBox>
      <Typography variant="h5" sx={{ color: "white " }}>
        Create an account
      </Typography>
      <RegisterPageInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      />
    </AuthBox>
  );
};

export default RegisterPage;
