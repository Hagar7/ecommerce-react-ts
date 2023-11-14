import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
};

export default Layout;
