import { LightningElement, api, track, wire } from 'lwc';

import fetchAccount from '@salesforce/apex/FetchContactsfromAccount.fetchAccount';
import fetchContact from '@salesforce/apex/FetchContactsfromAccount.fetchContact';

export default class AccountContactList extends LightningElement {
    @track accId= ' ';
    @api Accounts=[];
    @wire(fetchAccount)wiredAccount({data, error}){
        if(data){
            this.Accounts=[];
            data.forEach(element => {
                this.Accounts.push({
                    label:element.Name,
                    value:element.Id
                })
            });
        }
        if(error){
            this.error=error;
        } 
    }
    handleChange(event){
        this.accId=event.detail.value;
    }
    @wire(fetchContact,{accId: '$accId'})
    Contacts;
}
