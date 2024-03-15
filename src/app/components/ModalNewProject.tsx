
import { Box, Modal, Typography, Stack, Button, TextField, OutlinedInput, FormControl, useFormControl, FormHelperText, Tooltip, FilledInput, Input } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { modalService } from '../services/modal.service';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../redux/states/projects';
import { Project } from '../models/Project';
import { v4 as uuidv4 } from 'uuid';
import confirm from '../helps/confirm';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';
import { Close } from '@mui/icons-material';
import { File } from 'buffer';



const ModalNewProject = () => {

    const [open, setOpen] = useState<boolean>(false);

    const [nombre, setNombre] = useState<string>("");
    const [fecha, setFecha] = useState<Dayjs | null>(null);
    const [descripcion, setDescripcion] = useState<string>("");
    const [stack, setStack] = useState<string>("");
    const [imagen, setImagen] = useState<string>("");
    const [imagenSave, setImagenSave] = useState<any>();

    //console.log(imagenSave);

    // const saveFile = (e:any) => {
    //     console.log(e.target.files[0]);
    // };

    const [isEmptyField, setIsEmptyField] = useState<boolean>(false);

    const openModal$ = modalService.getProjectSubject();
    const dispatch = useDispatch();

    const [value, setValue] = useState<Dayjs | null>(null);

    //console.log(fecha?.toDate());

    useEffect(() => {
        openModal$.subscribe((estado: boolean) => {
            setOpen(estado);
        });
    });

    const handleClose = () => {
        setNombre("");
        setFecha(null);
        setDescripcion("");
        setStack("");
        setImagen("");
        setIsEmptyField(false);
        modalService.setProjectSubject(false);
    };

    const handleAddProject = async (e: any) => {
        e.preventDefault();


        if (!nombre || !fecha || !descripcion || !stack || !imagenSave) {
            setIsEmptyField(true);
            return;
        }

        setIsEmptyField(false);
        modalService.setProjectSubject(false);

        //const data =  new Blob([imagenSave?], { type: imagenSave?.type });

        const fd = new FormData();
        fd.append("projectId", uuidv4());
        fd.append("imagen", imagenSave);
        fd.append("nombre", nombre);
        fd.append("fecha", fecha?.toString());
        fd.append("descripcion", descripcion);
        fd.append("stack", stack);

        // const project: Project = {
        //     projectId: uuidv4(),
        //     nombre: nombre,
        //     fecha: fecha?.toString(),
        //     descripcion: descripcion,
        //     stack: stack,
        //     imagen: fd
        // }

        const userConfirm = await confirm();

        if (!userConfirm) {
            setNombre("");
            setFecha(null);
            setDescripcion("");
            setStack("");
            setImagen("");

            return;
        }

        try {

            // const addProjectResp = await fetch(`/api/projects`, {
            //     method: 'POST',
            //     headers: { "Content-type": "application/json" },
            //     body: JSON.stringify(project)
            // })

            const addProjectResp = await fetch(`/api/projects`, {
                method: 'POST',
                body: fd
            })

            const { msg } = await addProjectResp.json();
            dispatch(addProject(msg));

        } catch (e: any) {
            console.log("Ha ocurrido un error");
        }

        setNombre("");
        setFecha(null);
        setDescripcion("");
        setStack("");
        setImagen("");


    };

    //Estilos del modal
    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#F7F7F7',
        border: '2px solid #000000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...modalStyle, width: 400 }}>
                <Stack direction="row" justifyContent="right" alignItems="center">
                    <Button onClick={(e) => handleClose()} >
                        <Close fontSize='large' color='action' />
                    </Button>
                </Stack>
                <Typography variant="h6" align="center" color="black" mb={4}>
                    Nueva historia
                </Typography>

                <Stack gap={3} mb={5}>

                    <Stack>
                        <TextField value={nombre} onChange={(e) => setNombre(e.target.value)} label="Nombre" variant="filled"  {...(((nombre == "") && isEmptyField) ? { error: true } : {})} {...(((nombre == "") && isEmptyField) ? { helperText: "Campo vacío" } : {})} />
                    </Stack>

                    <Stack>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} >
                                <DatePicker value={fecha} onChange={(newValue) => setFecha(newValue)} label="Fecha" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Stack>

                    <Stack>
                        <TextField value={descripcion} onChange={(e) => setDescripcion(e.target.value)} label="Descripcion" variant="filled" {...(((descripcion == "") && isEmptyField) ? { error: true } : {})} {...(((descripcion == "") && isEmptyField) ? { helperText: "Campo vacío" } : {})} />
                    </Stack>

                    <Stack>
                        <TextField value={stack} onChange={(e) => setStack(e.target.value)} label="Stack" variant="filled" {...(((stack == "") && isEmptyField) ? { error: true } : {})} {...(((stack == "") && isEmptyField) ? { helperText: "Campo vacío" } : {})} />
                    </Stack>

                    <Stack>
                        <Input type='file' onChange={(e: any) => setImagenSave(e.target.files[0])} />
                    </Stack>

                    {/* <Stack justifyContent="center" alignItems="center" marginBottom={2}>
                        <TextField value={imagen} onChange={(e) => setImagen(e.target.value)} label="Url image" variant="filled" {...(((imagen == "") && isEmptyField) ? { error: true } : {})} {...(((imagen == "") && isEmptyField) ? { helperText: "Campo vacío" } : {})} />
                    </Stack> */}

                </Stack>

                <Stack justifyContent='center' alignItems="center">
                    <Button onClick={handleAddProject} size='medium' variant="contained" color="success">Guardar</Button>
                </Stack>

            </Box>
        </Modal>
    );
};

export default ModalNewProject;