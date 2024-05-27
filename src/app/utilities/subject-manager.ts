import {Subject} from 'rxjs';
import Alert, { AlertColor } from '@mui/material/Alert';

interface AlertData{
    title: string,
    message: string,
    type: AlertColor,
}
export default class SubjectManager{

    private subject: Subject<boolean> = new Subject<boolean>();
    private showModal: Subject<boolean> = new Subject<boolean>();
    private dataShowModal: Subject<any> = new Subject<any>();
    private projectSubject: Subject<boolean> = new Subject<boolean>();
    private messageSubject: Subject<boolean> = new Subject<boolean>();
    private showMessagesSubject: Subject<boolean> = new Subject<boolean>();
    private alertSubject: Subject<boolean> = new Subject<boolean>();
    private alertDataSubject: Subject<AlertData> = new Subject<AlertData>;


    getSubject(){
        return this.subject.asObservable();
    }

    setSubject(estado: boolean){
        this.subject.next(estado);
    }

    setShowModal(estado: boolean){
        this.showModal.next(estado);
    }

    setDataShowModal(body: any){
        this.dataShowModal.next(body);
    }

    getDataShowModal(){
        return this.dataShowModal.asObservable();
    }
    
    getShowModal(){
        return this.showModal.asObservable();
    }

    getProjectSubject(){
        return this.projectSubject.asObservable();
    }

    setProjectSubject(estado:boolean){
        this.projectSubject.next(estado);
    }

    getMessageSubject(){
        return this.messageSubject.asObservable();
    }

    setMessageSubject(state: boolean){
        this.messageSubject.next(state);
    }

    getShowMessages(){
        return this.showMessagesSubject.asObservable();
    }

    setShowMessages(state: boolean){
        this.showMessagesSubject.next(state);
    }

    getAlertSubject(){
        return this.alertSubject.asObservable();
    }

    setAlertSubject(state: boolean){
        this.alertSubject.next(state);
    }

    getAlertDataSubject(){
        return this.alertDataSubject.asObservable();
    }

    setAlertDataSubject(state: AlertData){
        this.alertDataSubject.next(state);
    }
}