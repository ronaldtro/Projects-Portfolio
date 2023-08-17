
import { Box, Modal, Typography, Stack, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { modalService } from '../services/modal.service';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../redux/states/projects';
import { Project } from '../models/Project';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../models/Message';
import { addMessage } from '../redux/states/messages';

export const ModalNewMessage = () => {

    const [open, setOpen] = useState<boolean>(false);

    const [subject, setSubject] = useState<string>("");
    const [body, setBody] = useState<string>("");

    const openModal$ = modalService.getMessageSubject();
    const dispatch = useDispatch();
    const user = useSelector((store: any) => store.user);

    useEffect(() => {
        openModal$.subscribe((estado: boolean) => {
            setOpen(estado);
        });
    });

    const handleClose = () => {
        modalService.setMessageSubject(false);
    };

    const handleMessage = async (e: any) => {
        e.preventDefault();

        const message: Message = {
            messageId: uuidv4(),
            userId: user,
            subject: subject,
            body: body
        }

        try {
            const addMessageDb = await fetch(`/api/messages`, {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(message)
            })

            const { msg } = await addMessageDb.json();

            dispatch(addMessage(msg));

        } catch (e: any) {
            console.log("Ha ocurrido un error");
        }
        
        modalService.setMessageSubject(false);
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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...modalStyle, width: 400 }}>
                <Typography variant="body1" align="center" color="black" mb={2}>
                    Nuevo mensaje
                </Typography>
                <Stack justifyContent="center" alignItems="center" gap={2} mb={0.5}>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField value={subject} onChange={(e) => setSubject(e.target.value)} id="outlined-basic" label="Asunto" variant="outlined" />
                    </Stack>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField value={body} onChange={(e) => setBody(e.target.value)} id="outlined-basic" label="Cuerpo del mensaje" variant="outlined" />
                    </Stack>

                    <Button onClick={handleMessage} variant="outlined">Enviar</Button>
                </Stack>
            </Box>
        </Modal>
    );
}