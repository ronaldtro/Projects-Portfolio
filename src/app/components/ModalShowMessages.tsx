

import { Box, Modal, Typography, Button, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import { modalService } from '../services/modal.service';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../models/Message';
import { deleteMessage } from '../redux/states/messages';
import { Close } from '@mui/icons-material';


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
        top: '60%',
        left: '60%',
        transform: 'translate(-60%, -60%)',
        width: '70%',
        bgcolor: 'var(--primary-color)',
        border: '2px solid #000',
        boxShadow: 24,
        p: 5,
        color: 'var(--secondary-color)'
    };

    const handleDeleteMessage = async (e: any, id: any) => {
        e.preventDefault();

        try{
            const deleteLike = await fetch(`/api/messages?id=${id}`, {
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
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h5" align="center" color="black" mb={5}>
                    Mis mensajes
                </Typography>
                <Divider />
                {messages.length > 0 ?
                    <TableContainer>
                        <Table aria-label="simple table">
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
                                        <TableCell align="center">
                                            <Button onClick={(e) => handleDeleteMessage(e, m._id)} >
                                                <Close fontSize='medium' color='action' />
                                            </Button>
                                        </TableCell>
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