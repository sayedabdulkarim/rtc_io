import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="main_container">
      <Outlet />
    </div>
  );
};

export default App;
