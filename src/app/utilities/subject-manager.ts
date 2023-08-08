import {Subject} from 'rxjs';

export default class SubjectManager{

    private subject: Subject<boolean> = new Subject<boolean>();
    private projectSubject: Subject<boolean> = new Subject<boolean>();
    private messageSubject: Subject<boolean> = new Subject<boolean>();
    private showMessagesSubject: Subject<boolean> = new Subject<boolean>();


    getSubject(){
        return this.subject.asObservable();
    }

    setSubject(estado: boolean){
        this.subject.next(estado);
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
}