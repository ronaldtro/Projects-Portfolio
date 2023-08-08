
import { useState, SetStateAction } from "react";
import { Avatar, BottomNavigation, BottomNavigationAction, Box, Button, Divider, IconButton, Modal, Paper, Stack, Typography } from "../../../node_modules/@mui/material/index";
import HomeIcon from '../../../node_modules/@mui/icons-material/Home';
import SearchIcon from '../../../node_modules/@mui/icons-material/Search';
import AddBoxOutlinedIcon from '../../../node_modules/@mui/icons-material/AddBoxOutlined';
import MovieFilterOutlinedIcon from '../../../node_modules/@mui/icons-material/MovieFilterOutlined';
import { modalService } from "../services/modal.service";

const Footer = () => {

    //Para la paginacion de la barra baja
    const [value, setValue] = useState(0);

    const handleOpen = () => {
        modalService.setSubject(true);
    };

    return (
        <>
            <Paper>
                <BottomNavigation
                    value={value}
                    onChange={(_event: any, newValue: SetStateAction<number>) => {
                        setValue(newValue);
                    }}
                    sx={{ bgcolor: "#000000", py: 4, color: "#000000" }}
                >
                    <BottomNavigationAction label={<Typography variant="body2" color="white" aria-label="inicioText" sx={{ color: "#FFFFFF" }}>Mis proyectos</Typography>} icon={<HomeIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction label={<Typography variant="body2" color="white" aria-label="inicioText" sx={{ color: "#FFFFFF" }}>Mis proyectos</Typography>} icon={<SearchIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction label={<Typography variant="body2" color="white" aria-label="inicioText" sx={{ color: "#FFFFFF" }}>Mis proyectos</Typography>} icon={<AddBoxOutlinedIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction label={<Typography variant="body2" color="white" aria-label="inicioText" sx={{ color: "#FFFFFF" }}>Mis proyectos</Typography>} icon={<MovieFilterOutlinedIcon sx={{ color: "#FFFFFF" }} />} />
                    <IconButton onClick={handleOpen}>
                        <Avatar src="https://nimble-dango-e163d9.netlify.app/Foto.png" sx={{ width: 45, height: 42, mb: 1.5 }} />
                    </IconButton>
                </BottomNavigation>

            </Paper>



        </>

    );

};

export default Footer;