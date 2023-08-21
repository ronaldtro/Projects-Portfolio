


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
import { useEffect, useState } from 'react';
import { addLike, addLikes, removeLike } from "../redux/states/like";
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
    proyecto: Project,
    indice: number,
    indiceMax: number
}

const Project:React.FC<projectProps> = ({proyecto, indice, indiceMax}) => {

    const dispatch = useDispatch();
    const likes = useSelector( (store:any) => store.likes);
    const user = useSelector((store:any) => store.user);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [checkFavorite, setCheckFavorite] = useState(false);


    //Cargar likes de la db
    useEffect(() => {
        const getLikes = async () => {
            const likes = await fetch(`/api/likes`);
            const {msg} = await likes.json();

            //Estado del like
            if(msg.some((l:any) => (l.projectId == proyecto.projectId && l.userId == user))){
                setCheckFavorite(true);
            }else{
                setCheckFavorite(false);
            }

            dispatch(addLikes(msg));
        }
        getLikes();
    }, []);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike = async ( event: React.ChangeEvent<HTMLInputElement>) => {

        if(event.target.checked){

            setCheckFavorite(event.target.checked);

            const like: Like = {
                likeId: uuidv4(),
                userId: user,
                projectId: proyecto.projectId,
                tipo: "Proyecto"
            }

            if (!likes.some((l:any) => (l.projectId == like.projectId && l.userId == like.userId))) {
                try{
                    const addLikeDb = await fetch(`/api/likes`, {
                        method: 'POST',
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify(like)
                    })
                
                    const {msg} = await addLikeDb.json();
                    
                    dispatch(addLike(msg));
                }catch(e:any){
                    console.log("Ha ocurrido un error: "+e);
                }
            }

        };

        if(!event.target.checked){

            setCheckFavorite(event.target.checked);

            const like = likes.find( (l:Like) => (l.projectId == proyecto.projectId && l.userId == user) );

            if(like){
                try{
                    const deleteLike = await fetch(`api/likes?id=${like._id}`, {
                        method: 'DELETE',
                        headers: {"Content-type": "application/json"}
                    });
                    const {msg} = await deleteLike.json();

                }catch(e:any){
                    console.log("Ha ocurrido un error al eliminar el like de la Db");
                }
                dispatch(removeLike(like));
            }

        }

    }

    const handleModalMessage = (e:any) => {
        e.preventDefault();
        modalService.setMessageSubject(true);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <Card sx={{ bgcolor: "#000000", pt: indice == 0 ? 26 : 3, pb: indice == indiceMax ? 10 : 0 }}>
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
                src={proyecto.imagen}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="white">
                    {proyecto.descripcion}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>

                <Checkbox {...label} icon={<FavoriteBorderIcon sx={{ color: "#FFFFFF" }} />} 
                          onChange={handleLike} checked={checkFavorite} checkedIcon={<FavoriteIcon sx={{ color: "#FFFFFF" }} />} />

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
                    <Typography variant="body2" color="primary">
                        Stack usado
                    </Typography> 
                    <ExpandMoreIcon color="primary" />
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