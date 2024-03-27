import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import { alertService } from '../services/alert.service';
import { AlertTitle } from '@mui/material';


export const AlertComponent = () => {
    const alertObs$ = alertService.getAlertSubject();
    const alertData$ = alertService.getAlertDataSubject();

    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [alertData, setAlertData] = useState<any>({});

    //Suscribirme a las instancias de los observables y enlazo su valor a las variables useState
    useEffect(() => {
        alertObs$.subscribe((value: boolean) => setIsAlert(value));
        alertData$.subscribe((value: any) => setAlertData(value));
    }, []);


    if (isAlert == true) {
        setTimeout(() => {
            alertService.setAlertSubject(false);
        }, 4000);
    }

    return (
        <Collapse in={isAlert} sx={{ width: '100%' }} >
            <Alert variant="filled" severity={alertData.type}>
                <AlertTitle>{alertData.title}</AlertTitle>
                {alertData.message}
            </Alert>
        </Collapse>
    )
};

