'use client';

import { Divider } from "@mui/material";
import { Provider } from "react-redux";
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
    <>
      <Provider store={configStore}>
        <Navbar />
        <Divider sx={{bgcolor: "#1E1E1E"}} />
        <Histories />
        <Divider sx={{bgcolor: "#1E1E1E"}} />
        <Projects />
        <Divider sx={{bgcolor: "#1E1E1E"}} />
        <ModalBox />
        <ModalShowMessages />
        <ModalNewMessage />
        <ModalNewProject />
        <Footer />
      </Provider>
    </>
  )
}
