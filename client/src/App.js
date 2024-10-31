import { Outlet } from "react-router-dom";
import AlertNotification from "./shared/components/AlertNotification";
import { useSelector } from "react-redux";

const App = () => {
  const { isAlert, type, content } = useSelector((state) => state.alertReducer);

  return (
    <div className="main_container">
      <AlertNotification
        showAlertMessage={isAlert}
        type={type}
        alertMessageContent={content}
      />
      <Outlet />
    </div>
  );
};

export default App;
