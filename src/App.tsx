import { Fragment } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./style/style.scss";
import Main from "./view/Main";

export default function App() {
  return (
    <Fragment>
      <Header />
      <Sidebar />
      <Main />
    </Fragment>
  );
}
