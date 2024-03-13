'use client';

import React, { useEffect, useState } from "react";
//MUI - icons
import ForumIcon from '@mui/icons-material/Forum';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AlertTitle, AppBar, Badge, Box, CssBaseline, IconButton, Stack, Toolbar, Typography } from '@mui/material/index';
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



const Navbar = () => {

  const dispatch = useDispatch();

  //Obtener de la db y almacenar los mensajes en el manejador de estados.
  useEffect(() => {
    const getMessages = async () => {
      const messages = await fetch(`/api/messages`);
      const { msg } = await messages.json();
      dispatch(addMessages(msg));
    }
    getMessages();
  }, []);

  //Obtener de la db y almacenar los likes en el manejador de estados.
  useEffect(() => {
    const getLikes = async () => {
      const likes = await fetch(`/api/likes`);
      const { msg } = await likes.json();

      dispatch(addLikes(msg));
    }
    getLikes();
  }, []);

  //Obtener de la db y Guardar los proyectos en el manejador de estados
  useEffect(() => {
    const getProjects = async () => {
      const projects = await fetch(`/api/projects`);
      const { msg } = await projects.json();
      dispatch(addProjects(msg));
    }
    getProjects();
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
      alertService.setAlertDataSubject({ type: "error", message: "Necesitas permisos de administrador", title: "Error al visualizar mensajes" });
      alertService.setAlertSubject(true);
    }

  }

  return (
    
    <AppBar component="nav" sx={{ bgcolor: '#000000' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          𝓡𝓸𝓷𝓪𝓵𝓭 𝓓𝓮𝓿 <KeyboardArrowDownIcon />
        </Typography>

        <IconButton aria-label="Favorites" disabled>
          <Badge badgeContent={likes.length} max={50} color="error">
            <FavoriteBorderIcon sx={{ color: "#FFFFFF" }} />
          </Badge>
        </IconButton>
        <IconButton onClick={handleShowMessages} aria-label="Messages">
          <Badge badgeContent={messages.length} max={50} color="error">
            <ForumIcon sx={{ color: "#FFFFFF" }} />
          </Badge>
        </IconButton>
      </Toolbar>
      <AlertComponent />
    </AppBar>

  );
};

export default Navbar;