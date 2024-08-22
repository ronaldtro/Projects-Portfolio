
import { useState, useEffect } from "react";
import {
    AppBar, Avatar, BottomNavigation, BottomNavigationAction, Box, Divider, IconButton,
    Modal, Paper, Stack, Toolbar, Typography
} from "../../../node_modules/@mui/material/index";
import HomeIcon from '../../../node_modules/@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import SendIcon from '@mui/icons-material/Send';
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
    const [borderProperties, setBorderProperties] = useState("2px solid var(--primary-color)");
    const [navigateOptions, setNavigateOptions] = useState("");
    const handleOpen = () => {
        modalService.setSubject(true);
    };

    function handleDM(){
        modalService.setMessageSubject(true);
    }

    function showContact() {

        modalService.setDataShowModal(<>
            <Box sx={{ padding: 5 }}>
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    gap={5}
                    marginBottom={1}
                >

                    <Link href="https://www.linkedin.com/in/ronaldtro">
                        <BsLinkedin size={30} color="var(--secondary-color)" />
                    </Link>
                    <Link href="https://github.com/ronaldtro">
                        <BsGithub size={30} color="var(--secondary-color)" />
                    </Link>
                    {/* <Link href="#">
                        <FaInstagram size={30} color="black" />
                    </Link> */}
                </Stack>

                <Divider sx={{ bgcolor: "#11E1E", marginBottom: 2 }} />

                <Typography variant="body2" align="center" color="var(--secondary-color)" mb={1}>ronald.2415@hotmail.com</Typography>
                <Typography variant="body2" align="center" color="var(--secondary-color)" mb={1}>Ing. de sistemas</Typography>
                <Typography variant="body2" align="center" color="var(--secondary-color)" mb={1}>+57 3137395166</Typography>
                <Typography variant="body2" align="center" color="var(--secondary-color)">Ronald C.</Typography>
            </Box>
        </>)
        modalService.setShowModal(true);
    }

    return (
        <AppBar position="fixed" sx={{
            top: "auto", bottom: 0, width: "100%",
            backgroundColor: "var(--primary-color)", paddingY: 1
        }}>
            <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                {/* <IconButton color="default" aria-label="home button">
                    <HomeIcon sx={{ color: "var(--secondary-color)" }} />
                </IconButton>
                <IconButton color="default" aria-label="button">
                    <SearchIcon sx={{ color: "var(--secondary-color)" }} />
                </IconButton>
                <IconButton color="default" aria-label="button">
                    <AddBoxOutlinedIcon sx={{ color: "var(--secondary-color)" }} />
                </IconButton>
                <IconButton color="default" aria-label="button">
                    <LinkedInIcon />
                </IconButton>
                <IconButton onClick={handleOpen} color="default" aria-label="button">
                    <Avatar src="ronald_logo.png" sx={{ border: borderProperties }} />
                </IconButton> */}
                <BottomNavigation showLabels value={navigateOptions}
                    sx={{backgroundColor: "var(--primary-color)"}}
                    onChange={(event, newValue) => setNavigateOptions(newValue)}>
                    <BottomNavigationAction
                        href="#home"
                        label={<Typography sx={{ color: 'var(--secondary-color)' }}>Home</Typography>}
                        icon={<HomeIcon sx={{ color: "var(--green-color)" }} />}
                    />
                    <BottomNavigationAction
                        onClick={handleDM}
                        label={<Typography sx={{ color: 'var(--secondary-color)' }}>Dm</Typography>}
                        icon={<SendIcon sx={{ color: "var(--green-color)" }} />}
                    />
                    <BottomNavigationAction
                        onClick={showContact}
                        label={<Typography sx={{ color: 'var(--secondary-color)' }}>Contact</Typography>}
                        icon={<ContactPageIcon sx={{ color: 'var(--green-color)' }} />}
                    />
                    <BottomNavigationAction
                        onClick={handleOpen}
                        label={<Typography sx={{ color: 'var(--secondary-color)' }}>Profile</Typography>}
                        icon={<Avatar src="ronald_logo.png" sx={{ border: borderProperties }} />}
                    />
                </BottomNavigation>
            </Toolbar>

        </AppBar>
    );

};

export default Footer;