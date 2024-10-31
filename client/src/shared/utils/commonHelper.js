import { setAlert, resetAlert } from "../../slices/alert/alertSlice";

const handleShowAlert = (dispatch, type, content, timeout = 2000) => {
  dispatch(setAlert({ type, content }));
  setTimeout(() => {
    dispatch(resetAlert());
  }, timeout);
};

export { handleShowAlert };
