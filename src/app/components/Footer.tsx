
import { useState, useEffect } from "react";
import {
    AppBar, Avatar, BottomNavigation, BottomNavigationAction, Box, Divider, IconButton,
    Modal, Paper, Stack, Toolbar, Typography
} from "../../../node_modules/@mui/material/index";
import HomeIcon from '../../../node_modules/@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SearchIcon from '../../../node_modules/@mui/icons-material/Search';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AddBoxOutlinedIcon from '../../../node_modules/@mui/icons-material/AddBoxOutlined';
import MovieFilterOutlinedIcon from '../../../node_modules/@mui/icons-material/MovieFilterOutlined';
import { modalService } from "../services/modal.service";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {

    //Para la paginacion de la barra
    // const [value, setValue] = useState(0);
    const [borderProperties, setBorderProperties] = useState("2px solid #FFFFFF");
    const [navigateOptions, setNavigateOptions] = useState("");
    const handleOpen = () => {
        modalService.setSubject(true);
    };

    function showContact() {

        modalService.setDataShowModal(<>
            <Box sx={{padding: 5}}>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    gap={5}
                    marginBottom={1}
                >

                    <Link href="https://www.linkedin.com/in/ronaldtro">
                        <BsLinkedin size={30} color="black"/>
                    </Link>
                    <Link href="#">
                        <BsGithub size={30} color="black" />
                    </Link>
                    {/* <Link href="#">
                        <FaInstagram size={30} color="black" />
                    </Link> */}
                </Stack>

                <Divider sx={{ bgcolor: "#1E1E1E", marginBottom: 2 }} />

                <Typography variant="body2" align="center" color="black" mb={1}>ronald.2415@hotmail.com</Typography>
                <Typography variant="body2" align="center" color="black" mb={1}>Ing. de sistemas</Typography>
                <Typography variant="body2" align="center" color="black" mb={1}>+57 3137395166</Typography>
                <Typography variant="body2" align="center" color="black">Ronald C.</Typography>
            </Box>
        </>)
        modalService.setShowModal(true);
    }

    return (
        <AppBar position="fixed" sx={{
            top: "auto", bottom: 0, width: "100%",
            backgroundColor: "#ffffff", paddingY: 1
        }}>
            <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                {/* <IconButton color="default" aria-label="home button">
                    <HomeIcon sx={{ color: "#000000" }} />
                </IconButton>
                <IconButton color="default" aria-label="button">
                    <SearchIcon sx={{ color: "#000000" }} />
                </IconButton>
                <IconButton color="default" aria-label="button">
                    <AddBoxOutlinedIcon sx={{ color: "#000000" }} />
                </IconButton>
                <IconButton color="default" aria-label="button">
                    <LinkedInIcon />
                </IconButton>
                <IconButton onClick={handleOpen} color="default" aria-label="button">
                    <Avatar src="ronaldev_logo.svg" sx={{ border: borderProperties }} />
                </IconButton> */}
                <BottomNavigation showLabels value={navigateOptions}
                    onChange={(event, newValue) => setNavigateOptions(newValue)}>
                    <BottomNavigationAction
                        label={<Typography sx={{ color: '#000000' }}>Home</Typography>}
                        icon={<HomeIcon sx={{ color: "#000000" }} />}
                    />
                    <BottomNavigationAction
                        onClick={showContact}
                        label={<Typography sx={{ color: '#000000' }}>Contact</Typography>}
                        icon={<ContactPageIcon sx={{ color: '#000000' }} />}
                    />
                    <BottomNavigationAction
                        onClick={handleOpen}
                        label={<Typography sx={{ color: '#000000' }}>Profile</Typography>}
                        icon={<Avatar src="ronaldev_logo.svg" sx={{ border: borderProperties }} />}
                    />
                </BottomNavigation>
            </Toolbar>

        </AppBar>
    );

};

export default Footer;