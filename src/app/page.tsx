'use client';

import { Divider } from "@mui/material";
import { Provider, useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Histories from "./components/Histories";
import ModalBox from "./components/ModalBox";
import { ModalNewMessage } from "./components/ModalNewMessage";
import ModalNewProject from "./components/ModalNewProject";
import ModalShowMessages from "./components/ModalShowMessages";
import Navbar from "./components/Navbar";
import { Projects } from "./components/Projects";
import { configStore } from "./redux/store";

export default function Home() {

  return (
    <div>
      <Provider store={configStore}>
        <Navbar />
        <Projects />
        <ModalBox />
        <ModalShowMessages />
        <ModalNewMessage />
        <ModalNewProject />
        <Footer />
      </Provider>
    </div>
  )
}