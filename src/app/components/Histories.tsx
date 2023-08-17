
import { Avatar, IconButton, Stack, Badge, Typography, Button, Box, CssBaseline, Toolbar, AppBar } from "@mui/material/index";
import { useDispatch, useSelector } from "react-redux";
import { Like } from "../models/Like";
import { Project } from "../models/Project";
import { removeLike } from "../redux/states/like";
import { addProjects, deleteProject } from "../redux/states/projects";
import { modalService } from "../services/modal.service";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect } from "react";
import Swal from 'sweetalert2'


const Histories = () => {

    const dispatch = useDispatch();

    //Obtener proyectos
    useEffect(() => {
        const getProjects = async () => {
            const projects = await fetch('http://localhost:3000/api/projects');
            const { msg } = await projects.json();
            dispatch(addProjects(msg));
        }
        getProjects();
    }, []);


    const projects = useSelector((store: any) => store.projects);
    const likes = useSelector((store: any) => store.likes);
    const user = useSelector((store: any) => store.user);


    const handleAddProject = (e: any) => {
        e.preventDefault();

        if (user == "admin") {
            modalService.setProjectSubject(true);
        } else {
            alert("Lo siento, no eres admin");
        }
    };

    const handleDeleteProject = async (e: any, project: Project) => {
        e.preventDefault();

        // const like = likes.find((l: Like) => (l.projectId == project.projectId && l.userId == user.userId));

        // if (like) {
        //     try{
        //         const deleteLike = await fetch(`api/likes?id=${like._id}`, {
        //             method: 'DELETE',
        //             headers: {"Content-type": "application/json"}
        //         });
        //         const {msg} = await deleteLike.json();
        //         console.log(msg);
        //     }catch(e:any){
        //         console.log("Ha ocurrido un error al eliminar el like de la Db");
        //     }
        //     dispatch(removeLike(like._id));
        // }

        if (user == "admin") {
            try {
                const deleteProject = await fetch(`api/projects?id=${project._id}`, {
                    method: 'DELETE',
                    headers: { "Content-type": "application/json" }
                });
                const { msg } = await deleteProject.json();

            } catch (e: any) {
                console.log("Ha ocurrido un error al eliminar el proyecto de la Db");
            }

            dispatch(deleteProject(project));
        } else {
            alert("Lo siento, no eres admin");
        }

    };

    return (
        <div>
            <Stack direction="row" justifyContent="start" alignItems="center" gap={3} pl={2} py={1}>
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
                        Tú proyecto
                    </Typography>
                </Stack>
                {projects.map((p: Project) => (
                    <Stack key={p.projectId} justifyContent="center" alignItems="center">
                        <Button onClick={(e) => handleDeleteProject(e, p)}>
                            <Typography color="white" aria-label="Descripcion">
                                X
                            </Typography>
                        </Button>
                        <IconButton>
                            <Avatar src="https://nimble-dango-e163d9.netlify.app/Foto.png" sx={{ width: 45, height: 42, border: "2px solid #22FF0C" }} />
                        </IconButton>
                        <Typography color="white" align="center" aria-label="Descripcion">
                            Proyecto {(projects.indexOf(p)) + 1}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </div>

    );
};

export default Histories;