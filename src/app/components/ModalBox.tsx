
import { Box, IconButton, Modal, Typography, Stack, Divider, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { GrClose } from "react-icons/gr";
import { FaRegHandSpock, FaBootstrap, FaReact, FaAngular, FaInstagram, FaNode } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { SiMui } from "react-icons/si";
import { BsLinkedin, BsGithub, BsMicrosoft } from "react-icons/bs";
import { modalService } from '../services/modal.service';


const ModalBox = () => {

    const [open, setOpen] = useState<boolean>(false);
    const openModal$ = modalService.getSubject();

    useEffect(() => {
        openModal$.subscribe( (estado: boolean) => {
            setOpen(estado);
        });
    });

    const handleClose = () => {
        modalService.setSubject(false);
    };

    //Estilos del modal
    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#FFFFFF',
        border: '2px solid #000',
        boxShadow: 24,
        color: '#000000',
        p: 5
    };

    const externalPage = (e:any, tipo: string) => {
        e.preventDefault();
        if (tipo == "linkedin") {
            window.open('https://www.linkedin.com/in/ronaldtro', '_blank');
        }

        if (tipo == "github") {
            window.open('https://www.github.com/ronaldtro', '_blank');
        }

        if (tipo == "instagram") {
            window.open('https://www.instagram.com/ronald.jsx/', '_blank');
        }

    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{...modalStyle}}>

                <Typography variant="h3" align="right" color="black" mb={4}>
                    <IconButton onClick={handleClose}>
                        <GrClose color="black" size={25} />
                    </IconButton>
                </Typography>

                <Typography variant="h6" align="center" color="black" mb={3}>
                    <FaRegHandSpock /> Hi, My name is Ronald
                </Typography>

                <Typography aria-label="ProfileDescription" align="justify" mb={4}>
                    Actually i work in the analysis and web apps development. 
                    I worked and have experience with: Angular, React, Next.js, Asp.net 7
                    , between others technologies.
                </Typography>
                <Typography aria-label="ProfileDescription" align="justify" mb={4}>
                    As a professional, I am a committed person, with much motivation and desire
                    to grow in the job y personal. I like
                    guide my work to quality, work in team and y learn in each
                    experience.
                </Typography>

                <Stack justifyContent="center" alignItems="center" direction="row" gap={2} mb={1}>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FaReact size={35} />
                        <Typography variant="body2" color="black">
                            React
                        </Typography>
                    </Stack>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FaAngular size={35} />
                        <Typography variant="body2" color="black">
                            Angular
                        </Typography>
                    </Stack>
                    <Stack justifyContent="center" alignItems="center">
                        <FaNode size={35}/>
                        <Typography variant="body2" color="black">
                            NodeJs
                        </Typography>
                    </Stack>
                    <Stack justifyContent="center" alignItems="center">
                        <BsMicrosoft />
                        <Typography variant="body2" color="black">
                            Asp.net core
                        </Typography>
                    </Stack>
                </Stack>

                <Stack justifyContent="center" alignItems="center" direction="row" gap={2}>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FaBootstrap size={35} />
                        <Typography variant="body2" color="black">
                            Bootstrap
                        </Typography>
                    </Stack>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <BiLogoTailwindCss size={35} />
                        <Typography variant="body2" color="black">
                            Tailwind Css
                        </Typography>
                    </Stack>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <SiMui size={35} />
                        <Typography variant="body2" color="black">
                            MUI
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ModalBox;