
import { Box, IconButton, Modal, Typography, Stack, Divider, Button } from '@mui/material';
import { useState, useEffect } from 'react';

import { GrClose } from "react-icons/gr";
import { FaRegHandSpock, FaBootstrap, FaReact, FaAngular, FaInstagram } from "react-icons/fa";
import { BiLogoTailwindCss } from "react-icons/bi";
import { SiMui } from "react-icons/si";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { modalService } from '../services/modal.service';

function ChildModal() {

    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
        pt: 2,
        px: 4,
        pb: 3,
        color: '#000000'
    };

    return (
        <>
            <Button onClick={handleOpen}>Open Child Modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...modalStyle, width: 200 }}>
                    <Typography variant="body1">Text in a child modal</Typography>
                    <Typography variant="body2">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </Typography>
                    <Button onClick={handleClose}>Close Child Modal</Button>
                </Box>
            </Modal>
        </>
    );
}

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
        pt: 2,
        px: 4,
        pb: 3,
        color: '#000000'
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
            <Box sx={{ ...modalStyle, width: 400 }}>

                <Typography variant="h3" align="right" color="black" mb={4}>
                    <IconButton onClick={handleClose}>
                        <GrClose color="black" size={25} />
                    </IconButton>
                </Typography>

                <Typography variant="h6" align="center" color="black" mb={3}>
                    Web Developer
                </Typography>

                <Typography aria-label="PerfilDescription" align="justify" mb={4}>
                    <FaRegHandSpock /> Hola, mi nombre es Ronald y soy ingeniero de sistemas. Actualmente me dedico al
                    desarrollo web en el area Frontend. Me gusta mucho la tecnologia, la musica, el aprendizaje autodidacta
                    y conocer el mundo.
                </Typography>

                <Stack justifyContent="center" alignItems="center" direction="row" gap={2} mb={0.5}>
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

                <Stack
                    justifyContent="center"
                    direction="row"
                    alignItems="center"
                    mt={4}
                >
                    <IconButton onClick={(e) => externalPage(e, "linkedin")}>
                        <BsLinkedin size={20} />
                    </IconButton>
                    <IconButton onClick={(e) => externalPage(e, "github")}>
                        <BsGithub size={20} />
                    </IconButton>
                    <IconButton onClick={(e) => externalPage(e, "instagram")}>
                        <FaInstagram size={20} />
                    </IconButton>
                </Stack>

                <Divider sx={{ bgcolor: "#1E1E1E" }} />

                <Typography variant="body2" align="center" color="black">ronald.2415@hotmail.com</Typography>
                <Typography variant="body2" align="center" color="black">Ing. de sistemas</Typography>
                <Typography variant="body2" align="center" color="black">Ronald C.</Typography>
            </Box>
        </Modal>
    );
};

export default ModalBox;