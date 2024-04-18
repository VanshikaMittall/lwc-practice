import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendEmail from '@salesforce/apex/SendEmailController.sendEmail';
export default class EmailComponent extends LightningElement {
    @track isShowModal = false;
    @api myRecordId;
    fromEmail='vanshika.mittal@cloudanalogy.com';
    toEmail='';
    @track ToArr=[];
    FinalToArr=[];
    bccEmail= '';
    @track BccArr=[];
    FinalBccArr=[];
    ccEmail= '';
    @track CcArr=[];
    FinalCcArr=[];
    body='';//message body
    subject='';
    @track files = [];
    //Regex Validation Formula
    emailFormat =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
    @track wantToUploadFile = false;
    ContentVersionIdsArray=[];

    toggleFileUpload() {
        this.wantToUploadFile = true;
    }
    handleCloseAttchment(){
        this.wantToUploadFile = false;
    }
    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.files=[...this.files,...uploadedFiles];

        for(let i in uploadedFiles){
            this.ContentVersionIdsArray.push(uploadedFiles[i].contentVersionId);
        }
        
        this.wantToUploadFile = false;
    }
    handleBodyChange(event){

        if(event.target.name=='To'){
            this.toEmail= event.target.value;
        }
        
        if(event.target.name=='Bcc'){
            this.bccEmail= event.target.value;
        }

        if(event.target.name=='Cc'){
            this.ccEmail= event.target.value;
        }

        if(event.target.name=='Subject'){
            this.subject=event.target.value;
        }

        if(event.target.name=='body'){
            this.body=event.target.value;
        }
    }
    handleToPill(event){
        if(event.keyCode===13 || event.keyCode===188){
            this.addToItem(event.target.value);
            event.target.value='';  
        }
    }
    addToItem(mail){
        if(this.toEmail.match(this.emailFormat) && (!this.FinalToArr.includes(this.toEmail))){
            let items ={ 
                type : 'avatar',
                label : this.toEmail,
            }
            this.FinalToArr.push(mail);
            this.ToArr.push(items);
        }else{
            this.showToast('Error', 'Enter Valid Email', 'error');
        }
    }  
    handleToPillCC(event){
        if(event.keyCode===13 || event.keyCode===188){
            this.addCcItem(event.target.value);
            event.target.value='';  
        }
    }
    addCcItem(mail){
        if(this.ccEmail.match(this.emailFormat) && (!this.FinalCcArr.includes(this.ccEmail))){
            let items ={ 
                type : 'avatar',
                label : this.ccEmail,
            }
            this.FinalCcArr.push(mail);
            this.CcArr.push(items);
        }else{
            this.showToast('Error', 'Enter Valid Email', 'error');
        }
    }
    handleToPillBCC(event){
        if(event.keyCode===13 || event.keyCode===188){
            this.addBccItem(event.target.value);
            event.target.value='';  
        }
    }
    addBccItem(mail){
        if(this.bccEmail.match(this.emailFormat) && (!this.FinalBccArr.includes(this.bccEmail))){
            let items ={ 
                type : 'avatar',
                label : this.bccEmail,
            }
            this.FinalBccArr.push(mail);
            this.BccArr.push(items);
        }else{
            this.showToast('Error', 'Enter Valid Email', 'error');
        }
    }
    removeToPill(event){
        const pillIndex = event.detail.toEmail;
        const itempill = this.ToArr;
        const index = this.FinalToArr.indexOf(event.detail.toEmail);
        this.FinalToArr.splice(index,1);
        itempill.splice(pillIndex,1);
        this.ToArr=[...itempill];
    }
    removeCcPill(event){
        const pillIndex = event.detail.ccEmail;
        const itempill = this.CcArr;
        const index = this.FinalCcArr.indexOf(event.detail.ccEmail);
        this.FinalCcArr.splice(index,1);
        itempill.splice(pillIndex,1);
        this.CcArr=[...itempill];
    }
    removeBccPill(event){
        const pillIndex = event.detail.bccEmail;
        const itempill = this.BccArr;
        const index = this.FinalBccArr.indexOf(event.detail.bccEmail);
        this.FinalBccArr.splice(index,1);
        itempill.splice(pillIndex,1);
        this.BccArr=[...itempill];
    }
    handleRemove(event) {
        const index = event.target.dataset.index;
        this.files.splice(index, 1);
    }
    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() { 
        this.clearFields();
        this.isShowModal = false;
    }
    SendEmail(){
         let emailDetails = {toAddress: this.FinalToArr, ccAddress :this.FinalCcArr, bccAddress: this.FinalBccArr, subject: this.subject ,body: this.body, file: this.ContentVersionIdsArray}

         sendEmail({ emailDetailStr: JSON.stringify(emailDetails)}).then(() => {
            this.showToast('Success', 'Email sent successfully', 'success');
            this.clearFields();
            console.log("Email Sent");
        })
        .catch((error) => {
            this.showToast('Error', 'Failed to send email', 'error');
            console.error(error);
        });
    }
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
    clearFields() {
        this.toEmail='';
        this.ToArr=[];
        this.FinalToArr=[];
        this.bccEmail= '';
        this.BccArr=[];
        this.FinalBccArr=[];
        this.ccEmail= '';
        this.CcArr=[];
        this.FinalCcArr=[];
        this.body='';//message body
        this.subject='';
        this.files = [];
    }
}