
import { Avatar, IconButton, Stack, Badge, Typography, Button } from "@mui/material/index";
import { useDispatch, useSelector } from "react-redux";
import { Like } from "../models/Like";
import { Project } from "../models/Project";
import { removeLike } from "../redux/states/like";
import { deleteProject } from "../redux/states/projects";
import { modalService } from "../services/modal.service";


const Histories = () => {

    const projects = useSelector((store: any) => store.projects);
    const likes = useSelector((store: any) => store.likes);
    console.log(likes);
    
    const user = useSelector((store: any) => store.user);

    const dispatch = useDispatch();


    const handleAddProject = (e: any) => {
        e.preventDefault();
        modalService.setProjectSubject(true);
    };

    const handleDeleteProject = (e:any, projectId: string) => {
        e.preventDefault();
        const like = likes.find( (l:Like) => (l.projectId == projectId && l.userId == user.userId ));
        
        dispatch(deleteProject(projectId));
        dispatch(removeLike(like.likeId));
    };

    return (
        <Stack direction="row" justifyContent="start" alignItems="center" gap={3} pl={2} py={1} sx={{ bgcolor: "#000000" }}>
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
                <Stack justifyContent="center" alignItems="center">
                    <Button onClick={(e) => handleDeleteProject(e, p.projectId)}>
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
    );
};

export default Histories;