import { LightningElement } from 'lwc';

export default class DisplayInputs extends LightningElement {
    Fname;
    Lname;
    Email;
    Phone;
    Title;

    handleClick(event){
        if(event.target.name==='Fname'){
            this.Fname=event.target.value;   
        }else if(event.target.name==='Lname'){
            this.Lname=event.target.value;
        }else if(event.target.name==='Email'){
            this.Email=event.target.value;
        }else if(event.target.name==='Phone'){
            this.Phone=event.target.value;
        }else{
            this.Title=event.target.value;
        }
    }
    Click( ){
        this.Fname=this.Fname;
        this.Lname=this.Lname;
        this.Email=this.Email;
        this.Phone=this.Phone;
        this.title=this.title;
        console.log('First Name: ' + this.Fname);
        console.log('Last Name: ' + this.Lname);
        console.log('Email: ' + this.Email);
        console.log('Phone Number: ' + this.Phone);
        console.log('Title: ' + this.Title);
    }
}