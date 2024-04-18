import { LightningElement, wire, track, api } from 'lwc';

import {showToastEvent} from 'lightning/platformShowToastEvent';
import Opportunity from '@salesforce/schema/Opportunity';
import CloseDate from '@salesforce/schema/Opportunity.CloseDate';

export default class UpdateCloseDatePopup extends LightningElement {
    @api recordId;
    Opportunity=Opportunity;
    CloseDate=CloseDate;
    @track showModal=false;
}