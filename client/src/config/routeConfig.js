import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
//auth routes
import DashboardScreen from "../screens/auth/Dashboard";
//unauth routes
import LoginScreen from "../screens/unauth/Login";
import RegisterScreen from "../screens/unauth/Register";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Route>
      {/* private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<DashboardScreen />} />
      </Route>
      <Route path="*" element={<h1>404 Component</h1>} />
    </Route>
  )
);
