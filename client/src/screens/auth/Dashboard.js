import React from "react";
import { useGetPrivateDataQuery } from "../../slices/auth/authApiSlice";

const Dashboard = () => {
  const { data, error, isLoading } = useGetPrivateDataQuery();

  console.log(data, " ddd from pribate ");

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
