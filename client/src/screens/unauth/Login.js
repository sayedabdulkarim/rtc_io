import React, { useState, useEffect } from "react";
import AuthBox from "../../shared/components/AuthBox";
import { validateLoginForm } from "../../shared/utils/validators";
import LoginPageFooter from "../../shared/components/LoginPage/LoginPageFooter";
import LoginPageHeader from "../../shared/components/LoginPage/LoginPageHeader";
import LoginPageInputs from "../../shared/components/LoginPage/LoginPageInputs";
import { useLoginUserMutation } from "../../slices/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/auth/authSlice";

const LoginPage = ({ login }) => {
  //misc
  const dispatch = useDispatch();
  //state
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  //queries n mutation
  const [loginUser, { isLoading: loginLoading, error: loginError }] =
    useLoginUserMutation();

  useEffect(() => {
    setIsFormValid(validateLoginForm({ mail, password }));
  }, [mail, password, setIsFormValid]);

  const handleLogin = async () => {
    const userDetails = {
      mail,
      password,
    };

    try {
      const res = await loginUser(userDetails).unwrap();
      console.log(res, " resss");
      localStorage.setItem("jwtToken", res?.userDetails?.token);
      // handleShowAlert(dispatch, "success", res?.message);
      dispatch(setCredentials({ ...res?.userDetails }));
      // navigate("/");
    } catch (err) {
      // handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }

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
