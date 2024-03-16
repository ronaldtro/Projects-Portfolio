
import { Avatar, IconButton, Stack, Badge, Typography, Button, Box, Toolbar, AppBar, Container } from "@mui/material/index";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../models/Project";
import { deleteProject } from "../redux/states/projects";
import { modalService } from "../services/modal.service";
import { alertService } from "../services/alert.service";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import confirm from "../helps/confirm";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import imagenUrl from "../helps/imagenUrl";

const Histories = () => {

    const dispatch = useDispatch();

    const projects = useSelector((store: any) => store.projects);
    const user = useSelector((store: any) => store.user);
    const admin = process.env.ADMIN;

    const [imageSrc, setImageSrc] = useState<string>("");

    const t = createTheme({
        palette: {
            primary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#000000',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
    });

    const handleGetImage = async () => {
        //Obtener imagen
        const getImage = await fetch("/api/saveImage");
        const { msg } = await getImage.json();
        console.log(msg);

        //Forma 1 - visualizar imagen: Formatear a blob
        // const blob = new Blob([msg.image.data], { type: msg.type });
        // const img = URL.createObjectURL(blob);

        //Forma 2
        const base64Image = Buffer.from(msg.image.data).toString('base64');
        const dataURL = `data:${msg.type};base64,${base64Image}`;
        setImageSrc(dataURL);
    };

    const handleAddProject = (e: any) => {
        e.preventDefault();

        if (user == admin) {
            modalService.setProjectSubject(true);
        } else {
            alertService.setAlertDataSubject({ type: "error", message: "Necesitas permisos de administrador", title: "Error al crear proyectos" });
            alertService.setAlertSubject(true);
        }
    };

    const handleDeleteProject = async (e: any, project: Project) => {
        e.preventDefault();

        if (user == admin) {

            const userConfirm = await confirm();

            if (!userConfirm) return;

            try {
                const deleteProject = await fetch(`/api/projects?id=${project._id}`, {
                    method: 'DELETE',
                    headers: { "Content-type": "application/json" }
                });
                const { msg } = await deleteProject.json();

            } catch (e: any) {
                console.log("Ha ocurrido un error al eliminar el proyecto de la Db");
            }

            dispatch(deleteProject(project));
        } else {
            alertService.setAlertDataSubject({ type: "error", message: "Necesitas permisos de administrador", title: "Error al eliminar proyecto" });
            alertService.setAlertSubject(true);
        }

    };

    return (
        <Box sx={{ display: 'flex', overflowX: 'auto', width: '100%', backgroundColor: 'black', padding: '12px', gap: '30px' }}>
            <Stack justifyContent="center" alignItems="center">
                <IconButton onClick={handleAddProject}>
                    <Badge
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        color="primary"
                        badgeContent={<Typography variant="body2">+</Typography>}
                    >
                        <Avatar src="https://nimble-dango-e163d9.netlify.app/Foto.png" sx={{ width: 45, height: 42 }} />
                    </Badge>
                </IconButton>
                <Typography color="white" align="center" aria-label="Descripcion">
                    Tú historia
                </Typography>
            </Stack>

            <Stack direction="row" alignItems='center' justifyContent='center' spacing={5}>
                {projects.map((p: Project) => (
                    <Stack key={p.projectId}>
                        <Button onClick={(e) => handleDeleteProject(e, p)}>
                            {/* <Typography color="white" aria-label="Descripcion">
                                X
                            </Typography> */}
                            <Close fontSize="small" sx={{ color: '#FFFFFF' }} />
                        </Button>
                        <IconButton href={'#' + p.projectId}>
                            <Avatar src={imagenUrl(p.imagen.data, p.imagen.type)} sx={{ width: 45, height: 42, border: "2px solid #22FF0C" }} />
                        </IconButton>
                        <Typography color="white" align="center" aria-label="Descripcion">
                            App #{(projects.indexOf(p)) + 1}
                        </Typography>
                    </Stack>
                ))}
            </Stack>

        </Box>
    );
};

export default Histories;