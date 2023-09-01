
import { useState, SetStateAction, useEffect } from "react";
import { Avatar, BottomNavigation, BottomNavigationAction, Box, Button, Divider, IconButton, Modal, Paper, Stack, Typography } from "../../../node_modules/@mui/material/index";
import HomeIcon from '../../../node_modules/@mui/icons-material/Home';
import SearchIcon from '../../../node_modules/@mui/icons-material/Search';
import AddBoxOutlinedIcon from '../../../node_modules/@mui/icons-material/AddBoxOutlined';
import MovieFilterOutlinedIcon from '../../../node_modules/@mui/icons-material/MovieFilterOutlined';
import { modalService } from "../services/modal.service";
import Fade from '@mui/material/styles';

const Footer = () => {

    //Para la paginacion de la barra baja
    const [value, setValue] = useState(0);
    const [borderProperties, setBorderProperties] = useState("2px solid #FFFFFF");

    const handleOpen = () => {
        modalService.setSubject(true);
    };

    useEffect(() =>  {
        setTimeout(() => {
            if (borderProperties == "2px solid #000000") {
                setBorderProperties("2px solid #FFFFFF");
            } else {
                setBorderProperties("2px solid #000000");
            }
        }, 1000);
    }, [borderProperties]);

    return (
        <Box>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={(_event: any, newValue: SetStateAction<number>) => {
                        setValue(newValue);
                    }}
                    sx={{ bgcolor: "#000000", py: 5, color: "#000000" }}
                >
                    <BottomNavigationAction icon={<HomeIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction icon={<SearchIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction icon={<AddBoxOutlinedIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction icon={<MovieFilterOutlinedIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction onClick={handleOpen} label="" icon={<Avatar src="https://nimble-dango-e163d9.netlify.app/Foto.png" sx={{border: borderProperties}} />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );

};

export default Footer;