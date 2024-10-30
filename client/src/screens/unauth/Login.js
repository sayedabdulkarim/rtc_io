import React, { useState, useEffect } from "react";
import AuthBox from "../../shared/components/AuthBox";
import { validateLoginForm } from "../../shared/utils/validators";
import LoginPageFooter from "../../shared/components/LoginPage/LoginPageFooter";
import LoginPageHeader from "../../shared/components/LoginPage/LoginPageHeader";
import LoginPageInputs from "../../shared/components/LoginPage/LoginPageInputs";

const LoginPage = ({ login }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = () => {
    const userDetails = {
      mail,
      password,
    };

    console.log(userDetails, " we");
  };

  return (
    <AuthBox>
      <LoginPageHeader />
      <LoginPageInputs
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};

export default LoginPage;
