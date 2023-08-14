import React, { useState } from "react";
import ForumIcon from '@mui/icons-material/Forum';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AppBar, Badge, Box, CssBaseline, IconButton, Stack, Toolbar, Typography } from '@mui/material/index';
import { useSelector } from "react-redux";
import { modalService } from "../services/modal.service";
import Histories from "./Histories";

const Navbar = () => {

  const [cantLikes, setCantLikes] = useState<number>(0);
  const likes = useSelector((store: any) => store.likes);
  const messages = useSelector((store: any) => store.messages);

  console.log(messages);
  console.log(likes);

  const handleShowMessages = (e: any) => {
    e.preventDefault();
    modalService.setShowMessages(true);
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
            <IconButton aria-label="Favorites">
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