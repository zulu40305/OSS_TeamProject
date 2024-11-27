import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Layout(props) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}