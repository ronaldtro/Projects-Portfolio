'use client';

import React, { useEffect } from "react";
//MUI - icons
import ForumIcon from '@mui/icons-material/Forum';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material/index';
//React Redux
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../redux/states/messages";
import { addLikes } from "../redux/states/like";
import { addProjects } from "../redux/states/projects";
//Rxjs - Servicios a observables
import { modalService } from "../services/modal.service";
import { alertService } from "../services/alert.service";
//Alert
import { AlertComponent } from "./AlertComponent";
import { v4 as uuidv4 } from "uuid"
import { addUser } from "../redux/states/user";



const Navbar = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const initialGet = async () => {

      const projects = await fetch('/api/projects');
      const respP = await projects.json();
      console.log(respP.msg);


      const messages = await fetch(`/api/messages`);
      const respM = await messages.json();


      const likes = await fetch(`/api/likes`);
      const respL = await likes.json();

      dispatch(addProjects(respP.msg));
      dispatch(addMessages(respM.msg));
      dispatch(addLikes(respL.msg));

      const userId = localStorage.getItem("userId");
      if (userId) {
        dispatch(addUser(userId))
      } else {
        const newUser = uuidv4();
        localStorage.setItem("userId", newUser);
        dispatch(addUser(newUser));
      }

    };
    initialGet();

  }, []);


  const likes = useSelector((store: any) => store.likes);
  const messages = useSelector((store: any) => store.messages);
  const user = useSelector((store: any) => store.user);
  const admin = process.env.ADMIN;

  const handleShowMessages = (e: any) => {
    e.preventDefault();

    if (user == admin) {
      modalService.setShowMessages(true);
    } else {
      alertService.setAlertDataSubject({ type: "error", message: "You need admin permission", title: "Error to show messages" });
      alertService.setAlertSubject(true);
    }

  }

  return (
    <AppBar component="nav" sx={{ bgcolor: '#F6F3F3' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: '#000000'}}
        >
          𝓡𝓸𝓷𝓪𝓵𝓭 𝓓𝓮𝓿 <KeyboardArrowDownIcon />
        </Typography>

        <IconButton aria-label="Favorites" disabled>
          <Badge badgeContent={likes.length} max={50} color="error">
            <FavoriteBorderIcon sx={{ color: "#000000" }} />
          </Badge>
        </IconButton>
        <IconButton onClick={handleShowMessages} aria-label="Messages">
          <Badge badgeContent={messages.length} max={50} color="error">
            <ForumIcon sx={{ color: "#000000" }} />
          </Badge>
        </IconButton>
      </Toolbar>
      <AlertComponent />
    </AppBar>
  );
};

export default Navbar;