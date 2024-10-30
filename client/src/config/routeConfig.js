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
import HomeScreen from "../screens/auth/Home";
//unauth routes
import UnAuthScreen from "../screens/unauth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/register" element={<UnAuthScreen />} />
      </Route>
      {/* private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />} />
      </Route>
      <Route path="*" element={<h1>404 Component</h1>} />
    </Route>
  )
);
