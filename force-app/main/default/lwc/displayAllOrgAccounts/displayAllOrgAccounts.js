import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/fetchAccounts.fetchAccounts';
export default class DisplayAllOrgAccounts extends LightningElement {
    @wire(getAccounts) Accounts;
}