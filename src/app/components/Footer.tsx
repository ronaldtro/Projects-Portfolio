
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
        <Box mt={10}>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={(_event: any, newValue: SetStateAction<number>) => {
                        setValue(newValue);
                    }}
                    sx={{ bgcolor: "#000000", py: 5, color: "#000000" }}
                >
                    <BottomNavigationAction label={<Typography variant="body2" color="white" aria-label="inicioText" sx={{ color: "#FFFFFF" }}>Mis proyectos</Typography>} icon={<HomeIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction label={<Typography variant="body2" color="white" aria-label="inicioText" sx={{ color: "#FFFFFF" }}>Mis proyectos</Typography>} icon={<SearchIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction label={<Typography variant="body2" color="white" aria-label="inicioText" sx={{ color: "#FFFFFF" }}>Mis proyectos</Typography>} icon={<AddBoxOutlinedIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction label={<Typography variant="body2" color="white" aria-label="inicioText" sx={{ color: "#FFFFFF" }}>Mis proyectos</Typography>} icon={<MovieFilterOutlinedIcon sx={{ color: "#FFFFFF" }} />} />
                    <BottomNavigationAction onClick={handleOpen} label="" icon={<Avatar src="https://nimble-dango-e163d9.netlify.app/Foto.png" />} sx={{ color: "#FFFFFF" }} />
                </BottomNavigation>
            </Paper>
        </Box>
    );

};

export default Footer;