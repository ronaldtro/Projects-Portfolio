'use client';

import React, { useEffect, useState } from "react";
import ForumIcon from '@mui/icons-material/Forum';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppBar, Badge, Box, CssBaseline, IconButton, Stack, Toolbar, Typography } from '@mui/material/index';
import { useDispatch, useSelector } from "react-redux";
import { modalService } from "../services/modal.service";
import Histories from "./Histories";
import { addUser } from "../redux/states/user";
import { v4 as uuidv4 } from 'uuid';
import { addMessages } from "../redux/states/messages";

const Navbar = () => {

  //Id del usuario
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(addUser(userId));
    } else {
      const newUserId = uuidv4();
      localStorage.setItem('userId', newUserId);
      dispatch(addUser(newUserId));
    }
  }, []);

  //Obtener mensajes
  useEffect(() => {
    const getMessages = async () => {
      const messages = await fetch(`/api/messages`);
      const { msg } = await messages.json();
      dispatch(addMessages(msg));
    }
    getMessages();
  }, []);


  const [cantLikes, setCantLikes] = useState<number>(0);
  const likes = useSelector((store: any) => store.likes);
  const messages = useSelector((store: any) => store.messages);
  const user = useSelector((store: any) => store.user);

  const handleShowMessages = (e: any) => {
    e.preventDefault();

    if (user == "admin") {
      modalService.setShowMessages(true);
    } else {
      alert("Lo siento, no eres admin");
    }
  
  }

  return (
    <Box sx={{ display: 'flex' }} mb={23}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: '#000000' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            𝓡𝓸𝓷𝓪𝓵𝓭 𝓓𝓮𝓿 <KeyboardArrowDownIcon />
          </Typography>
          <Box>
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
          </Box>
        </Toolbar>

        <Toolbar sx={{ bgcolor: "#0F0F0F" }}>
          <Box sx={{ display: { xs: '', sm: '' } }}>
            <Histories />
          </Box>
        </Toolbar>

      </AppBar>

    </Box>
  );
};

export default Navbar;