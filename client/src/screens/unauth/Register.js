import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import AuthBox from "../../shared/components/AuthBox";
import RegisterPageInputs from "../../shared/components/register/RegisterPageInputs";
import RegisterPageFooter from "../../shared/components/register/RegisterPageFooter";
import { validateRegisterForm } from "../../shared/utils/validators";
import { useRegisterUserMutation } from "../../slices/auth/authApiSlice";
import { setCredentials } from "../../slices/auth/authSlice";

const RegisterPage = ({ register }) => {
  //misc
  const dispatch = useDispatch();
  //state
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  //queries n mutation
  const [registerUser, { isLoading: registerLoading, error: registerError }] =
    useRegisterUserMutation();

  //methods
  const handleRegister = async (e) => {
    const userDetails = {
      mail,
      password,
      username,
    };

    try {
      const res = await registerUser(userDetails).unwrap();
      console.log(res, " resss");
      localStorage.setItem("jwtToken", res?.userDetails?.token);
      // handleShowAlert(dispatch, "success", res?.message);
      dispatch(setCredentials({ ...res?.userDetails }));
      // navigate("/");
    } catch (err) {
      //   handleShowAlert(dispatch, "error", err?.data?.message);
      console.log(err, " errr");
    }

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
