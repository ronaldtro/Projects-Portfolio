
import { Box, Modal, Typography, Stack, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { modalService } from '../services/modal.service';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../redux/states/projects';
import {Project} from '../models/Project';
import {v4 as uuidv4} from 'uuid';

const ModalNewProject = () => {

    const [open, setOpen] = useState<boolean>(false);
    
    const [nombre, setNombre] = useState<string>("");
    const [fecha, setFecha] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [stack, setStack] = useState<string>("");

    const openModal$ = modalService.getProjectSubject();
    const dispatch = useDispatch();

    useEffect(() => {
        openModal$.subscribe( (estado: boolean) => {
            setOpen(estado);
        });
    });

    const handleClose = () => {
        modalService.setProjectSubject(false);
    };

    const handleAddProject = async (e:any) => {
        e.preventDefault();
        
        const project:Project = {
            projectId: uuidv4(),
            nombre: nombre,
            fecha: fecha,
            descripcion: descripcion,
            stack: stack
        }

        try{

            const addProjectResp = await fetch(`${process.env.SERVER_PROD}/api/projects`, {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(project)
            })
    
            const {msg} = await addProjectResp.json();
            
            dispatch(addProject(msg));

        }catch(e:any){
            console.log("Ha ocurrido un error");
        }

        modalService.setProjectSubject(false);
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
                    Nuevo proyecto
                </Typography>
                <Stack justifyContent="center" alignItems="center" gap={2} mb={0.5}>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField value={nombre} onChange={(e) => setNombre(e.target.value)} id="outlined-basic" label="Nombre" variant="outlined" />
                    </Stack>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField value={fecha} onChange={(e) => setFecha(e.target.value)} id="outlined-basic" label="Fecha" variant="outlined" />
                    </Stack>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField value={descripcion} onChange={(e) => setDescripcion(e.target.value)} id="outlined-basic" label="Descripcion" variant="outlined" />
                    </Stack>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField value={stack} onChange={(e) => setStack(e.target.value)} id="outlined-basic" label="Stack" variant="outlined" sx={{bgcolor: "#FFFFFF", color: "#FFFFFF"}}/>
                    </Stack>
                    <Button onClick={handleAddProject} variant="outlined">Guardar</Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ModalNewProject;