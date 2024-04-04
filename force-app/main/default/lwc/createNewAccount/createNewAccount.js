import { LightningElement,track } from 'lwc';

import createAccount from '@salesforce/apex/createAccount.createAccountinLwc';

import Account_Name from '@salesforce/schema/Account.Name';
import Account_Phone from '@salesforce/schema/Account.Phone';
import Account_Industry from '@salesforce/schema/Account.Industry';
import Account_Rating from '@salesforce/schema/Account.Rating';
import Account_AnnualRevenue from '@salesforce/schema/Account.AnnualRevenue';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class CreateNewAccount extends LightningElement {

    @track name = Account_Name;
    @track phone = Account_Phone;
    @track industry = Account_Industry;
    @track rating = Account_Rating;
    @track annualRevenue = Account_AnnualRevenue;

    record={
        Name : this.name,
        Phone : this.phone,
        Industry : this.industry,
        Rating : this.rating,
        AnnualRevenue : this.annualRevenue
    }

    handleNameChange(event){
        this.record.Name = event.target.value;
    }
    handlePhoneChange(event){
        this.record.Phone = event.target.value;
    }
    handleIndustryChange(event){
        this.record.Industry = event.target.value;
    }
    handleRatingChange(event){
        this.record.Rating = event.target.value;
    }
    handleAnnualRevenueChange(event){
        this.record.AnnualRevenue = event.target.value;
    }

    handleInsertButton(){
        createAccount({acc : this.record}).then(result =>{
            this.message = result;
                this.dispatchEvent(
                    new ShowToastEvent(
                        {
                            title: 'Success',
                           message: 'Account Created Succesfully',
                           variant: 'Success',
                        }
                    ),
                );
            }
        )
    }
}