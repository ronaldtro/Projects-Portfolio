
import { Avatar, IconButton, Stack, Badge, Typography, Button, Box, CircularProgress } from "@mui/material/index";
import { useDispatch, useSelector } from "react-redux";
import { Project } from "../models/Project";
import { deleteProject } from "../redux/states/projects";
import { modalService } from "../services/modal.service";
import { alertService } from "../services/alert.service";
import { createTheme } from '@mui/material/styles';
import confirm from "../helps/confirm";
import { Close } from "@mui/icons-material";

const Histories = () => {

    const dispatch = useDispatch();

    const projects = useSelector((store: any) => store.projects);
    const user = useSelector((store: any) => store.user);
    const admin = process.env.ADMIN;

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

    const handleAddProject = (e: any) => {
        e.preventDefault();

        if (user == admin) {
            modalService.setProjectSubject(true);
        } else {
            alertService.setAlertDataSubject({ type: "error", message: "You need admin permission", title: "Error to add project" });
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
            alertService.setAlertDataSubject({ type: "error", message: "You need admin permission", title: "Error to delete project" });
            alertService.setAlertSubject(true);
        }

    };

    return (
        <Box sx={{ display: 'flex', overflowX: 'auto', width: '100%', backgroundColor: '#ffffff',
                 paddingX: '15px', paddingY: '25px', gap: '33px' }}>
            <Stack justifyContent="center" alignItems="center">
                <IconButton onClick={handleAddProject} sx={{mb: 1}}>
                    <Badge
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        color="primary"
                        badgeContent={<Typography variant="body2">+</Typography>}
                    >
                        <Avatar src="ronaldev_logo.png" sx={{ width: 45, height: 42 }} />
                    </Badge>
                </IconButton>
                <Typography color="black" align="center" aria-label="Descripcion">
                    Add project
                </Typography>
            </Stack>

            <Stack direction="row" alignItems='center' justifyContent='center' spacing={5}>
                {projects.length != 0 ? projects.slice().reverse().map((p: Project, index: number) => (
                    <Stack key={p.projectId}>
                        <Button onClick={(e) => handleDeleteProject(e, p)}>
                            <Close fontSize="small" sx={{ color: '#000000' }} />
                        </Button>
                        <IconButton href={'#' + p.projectId}>
                            <Avatar src={p.imagen.data} sx={{ width: 52, height: 50, border: "3px solid #22FF0C" }} />
                        </IconButton>
                        <Typography variant="subtitle1" color="black" align="center" aria-label="Descripcion">
                            Project {index+1}
                        </Typography>
                    </Stack>
                )) : <Stack sx={{ width: "auto" }}>
                    <CircularProgress color="primary" />
                </Stack>}
            </Stack>
        </Box>
    );
};

export default Histories;