import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { modalService } from "../services/modal.service";


export function ModalComponent(){
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState("");

    modalService.getShowModal().subscribe((resp:any) => {
        setIsOpen(resp);
    })

    modalService.getDataShowModal().subscribe((resp:any) => {
        setModalData(resp);
    });

    function closeModal(){
        modalService.setShowModal(false);
    }

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
        color: '#000000',
    };

    return (
        <Modal open={isOpen} onClose={closeModal}>
            <Box sx={{...modalStyle}}>
                {modalData}
            </Box>
        </Modal>
    );
}