import { Avatar, Card, CardActions, Checkbox, CardContent, CardHeader, CardMedia, Collapse, IconButton, styled, Typography } from "@mui/material";

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ForumIcon from '@mui/icons-material/Forum';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { v4 as uuidv4 } from 'uuid';
import { Project } from "../models/Project";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { addLikes, removeLike } from "../redux/states/like";
import { useSelector } from "react-redux";
import { Like } from "../models/Like";
import { modalService } from '../services/modal.service';

const ExpandMore = styled((props: any) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface projectProps{
    proyecto: Project
}

const Project:React.FC<projectProps> = ({proyecto}) => {


    //Para expandir cada Card
    const [expanded, setExpanded] = useState<boolean>(false);
    const likes = useSelector( (store:any) => store.likes);
    const user = useSelector((store:any) => store.user);
    const [checked, setChecked] = useState( likes.some( (l:Like) => (l.projectId == proyecto.projectId && l.userId == user.userId)) );
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    const handleLike = ( event: React.ChangeEvent<HTMLInputElement>) => {

        if(event.target.checked){
            setChecked(event.target.checked);
            console.log("Diste like");

            console.log(user);
            
            const like: Like = {
                likeId: uuidv4(),
                userId: user.userId,
                projectId: proyecto.projectId,
                tipo: "Proyecto"
            }
    
            dispatch(addLikes(like));
        };

        if(!event.target.checked){
            setChecked(event.target.checked);
            console.log("Quitaste like");

            const like = likes.find( (l:Like) => (l.projectId == proyecto.projectId && l.userId == user.userId) );

            dispatch(removeLike(like.likeId));
        }

    }

    const handleModalMessage = (e:any) => {
        console.log("Activar modal mensaje");

        e.preventDefault();
        modalService.setMessageSubject(true);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Card sx={{ bgcolor: "#000000", pt: 2 }}>
            <CardHeader
                avatar={
                    <Avatar src="https://nimble-dango-e163d9.netlify.app/Foto.png" sx={{ bgcolor: 'success' }} aria-label="icon">
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon sx={{ color: "#FFFFFF" }} />
                    </IconButton>
                }
                title={proyecto.nombre}
                subheader={<Typography variant="body2" color="white">{proyecto.fecha}</Typography>}
                sx={{ color: "#FFFFFF" }}
            />
            <CardMedia
                component="img"
                height="380"
                sx={{ px: 1.5 }}
                image="https://mui.com/static/images/cards/paella.jpg"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="white">
                    {proyecto.descripcion}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                <Checkbox {...label} icon={<FavoriteBorderIcon sx={{ color: "#FFFFFF" }} />} onChange={handleLike} checked={checked} checkedIcon={<FavoriteIcon sx={{ color: "#FFFFFF" }} />} />

                <IconButton onClick={handleModalMessage} aria-label="share">
                    <ForumIcon sx={{ color: "#FFFFFF" }} />
                </IconButton>
                <IconButton href="https://www.instagram.com/ronald.jsx/" aria-label="send">
                    <SendIcon sx={{ color: "#FFFFFF" }} />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon sx={{ color: "#FFFFFF" }} />
                </ExpandMore>
                <IconButton>
                    <BookmarkBorderIcon sx={{ color: "#FFFFFF" }} />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography color="white" paragraph>
                        {proyecto.stack}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default Project;