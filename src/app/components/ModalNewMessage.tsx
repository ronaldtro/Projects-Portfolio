
import { Box, Modal, Typography, Stack, Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useState, useEffect } from 'react';
import { modalService } from '../services/modal.service';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../models/Message';
import { addMessage } from '../redux/states/messages';
import { alertService } from '../services/alert.service';
import SendIcon from '@mui/icons-material/Send';

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

        if (message.subject == '' || message.body == '') {
            // alert("Please, fill in all fields");
            alertService.setAlertDataSubject({ type: "warning", message: "Please, fill in all fields", title: "Empty fields" });
            alertService.setAlertSubject(true);
            return;
        }

        try {
            const addMessageDb = await fetch(`/api/messages`, {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(message)
            })

            const { msg } = await addMessageDb.json();

            dispatch(addMessage(msg));
            alertService.setAlertDataSubject({ type: "success", message: "Message sent successfully", title: "Message sent" });
            alertService.setAlertSubject(true);

        } catch (e: any) {
            console.log("Ha ocurrido un error");
        }

        setSubject("");
        setBody("");
        modalService.setMessageSubject(false);
    };

    //Estilos del modal
    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'var(--primary-color)',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        color: 'var(--secondary-color)',
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            hideBackdrop={true}
        >
            <Box sx={{ ...modalStyle, width: 400 }}>
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                    <Button onClick={handleClose}>
                        <CloseIcon sx={{ color: "var(--secondary-color)" }} />
                    </Button>
                </Box>
                <Typography variant="body1" align="center" mb={0.5}>
                    Send me a direct message
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1, marginBottom: 3 }}>
                    <SendIcon sx={{ color: "var(--secondary-color)" }} />
                </Box>
                <Stack justifyContent="center" alignItems="center" gap={2} mb={0.5}>
                    <Stack
                        justifyContent="start"
                        alignItems="start"
                    >
                        <Typography variant='body1'>
                            Subject
                        </Typography>
                        <TextField value={subject} onChange={(e) => setSubject(e.target.value)} sx={{ backgroundColor: '#FFFFFF' }}
                            id="outlined-basic" variant="outlined"
                        />
                    </Stack>
                    <Stack
                        justifyContent="start"
                        alignItems="start"
                    >
                        <Typography variant='body1'>
                            Body
                        </Typography>
                        <TextField value={body} onChange={(e) => setBody(e.target.value)} sx={{ backgroundColor: '#FFFFFF' }}
                            id="outlined-basic" variant="outlined"
                        />
                    </Stack>

                    <Button onClick={handleMessage} color='success' variant="outlined">Send</Button>
                </Stack>
            </Box>
        </Modal>
    );
}