

import { Box, Modal, Typography, Stack, Button, TextField, TableContainer, Paper, Table, TableHead, TableBody, TableCell, TableRow, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { modalService } from '../services/modal.service';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../redux/states/projects';
import { Project } from '../models/Project';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../models/Message';
import { addMessage, deleteMessage } from '../redux/states/messages';


const ModalShowMessages = () => {

    const [open, setOpen] = useState<boolean>(false);
    const openModal$ = modalService.getShowMessages();
    const dispatch = useDispatch();
    const messages = useSelector((store: any) => store.messages);

    useEffect(() => {
        openModal$.subscribe((estado: boolean) => {
            setOpen(estado);
        });
    });

    const handleClose = () => {
        modalService.setShowMessages(false);
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

    const handleDeleteMessage = async (e: any, id: any) => {
        e.preventDefault();

        try{
            const deleteLike = await fetch(`${process.env.SERVER_PROD}/api/messages?id=${id}`, {
                method: 'DELETE',
                headers: {"Content-type": "application/json"}
            });
            const {msg} = await deleteLike.json();
 
        }catch(e:any){
            console.log("Ha ocurrido un error al eliminar el mensaje de la Db");
        }

        dispatch(deleteMessage(id));
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...modalStyle, width: 400 }}>
                <Typography variant="body1" align="center" color="black" mb={2}>
                    Mis mensajes
                </Typography>
                <Divider />
                {messages.length > 0 ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Id</TableCell>
                                    <TableCell align="center">UserId</TableCell>
                                    <TableCell align="center">Subject</TableCell>
                                    <TableCell align="center">Body</TableCell>
                                    <TableCell align="center">Opcion</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {messages.map((m: Message) => (
                                    <TableRow
                                        key={m.messageId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {m._id}
                                        </TableCell>
                                        <TableCell align="center">{m.userId}</TableCell>
                                        <TableCell align="center">{m.subject}</TableCell>
                                        <TableCell align="center">{m.body}</TableCell>
                                        <TableCell align="center"><Button onClick={(e) => handleDeleteMessage(e, m._id)} color="info">X</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> :  
                    <Typography variant="body1" align="center" color="black" mb={2} mt={4}>
                        ** No hay mensajes **
                    </Typography>
                }

            </Box>
        </Modal>
    );
};

export default ModalShowMessages;