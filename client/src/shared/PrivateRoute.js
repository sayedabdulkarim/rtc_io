import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import Header from "./HeaderComponents";
// import Footer from "./Footer";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  return userInfo ? (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <div className="layout-page">
          {/* <Header /> */}
          <Outlet /> {/* rndr d protected child routes */}
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/register" replace />
  );
};

export default PrivateRoute;
