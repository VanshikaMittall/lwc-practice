import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class ToastEventLWC extends LightningElement {
    handleErrorClick(){
        const evnt=new ShowToastEvent({
            title:'Toast Error',
            message:'Some unexpected error',
            varient:'error'
        });
        this.dispatchEvent(evnt);
    }
    handleSuccessClick(){
        const evnt=new ShowToastEvent({
            title:'Toast Success',
            message:'Event Successful',
            varient:'Success'
        });
        this.dispatchEvent(evnt);
    }
    handleWarningClick(){
        const evnt=new ShowToastEvent({
            title:'Toast Warning',
            message:'Event Warning',
            varient:'Warning'
        });
        this.dispatchEvent(evnt);
    }
    handleInfoClick(){
        const evnt=new ShowToastEvent({
            title:'Toast Information',
            message:'Information Toast',
            varient:'Information'
        });
        this.dispatchEvent(evnt);
    }
}