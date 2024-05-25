
import { useState, useEffect } from "react";
import { AppBar, Avatar, BottomNavigation, BottomNavigationAction, Box, Divider, IconButton, Paper, Stack, Toolbar } from "../../../node_modules/@mui/material/index";
import HomeIcon from '../../../node_modules/@mui/icons-material/Home';
import SearchIcon from '../../../node_modules/@mui/icons-material/Search';
import AddBoxOutlinedIcon from '../../../node_modules/@mui/icons-material/AddBoxOutlined';
import MovieFilterOutlinedIcon from '../../../node_modules/@mui/icons-material/MovieFilterOutlined';
import { modalService } from "../services/modal.service";

const Footer = () => {

    //Para la paginacion de la barra
    // const [value, setValue] = useState(0);
    const [borderProperties, setBorderProperties] = useState("2px solid #FFFFFF");

    const handleOpen = () => {
        modalService.setSubject(true);
    };

    useEffect(() => {
        setTimeout(() => {
            if (borderProperties == "2px solid #000000") {
                setBorderProperties("2px solid #FFFFFF");
            } else {
                setBorderProperties("2px solid #000000");
            }
        }, 1000);
    }, [borderProperties]);

    return (
        <AppBar position="fixed" sx={{ top: "auto", bottom: 0, width: "100%", backgroundColor: "#ffffff" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                <IconButton color="default" aria-label="home button">
                    <HomeIcon sx={{ color: "#000000" }} />
                </IconButton>
                <IconButton color="default" aria-label="button">
                    <SearchIcon sx={{ color: "#000000" }} />
                </IconButton>
                <IconButton color="default" aria-label="button">
                    <AddBoxOutlinedIcon sx={{ color: "#000000" }} />
                </IconButton>
                <IconButton color="default" aria-label="button">
                    <MovieFilterOutlinedIcon sx={{ color: "#000000" }} />
                </IconButton>
                <IconButton onClick={handleOpen} color="default" aria-label="button">
                    <Avatar src="https://nimble-dango-e163d9.netlify.app/Foto.png" sx={{ border: borderProperties }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    );

};

export default Footer;