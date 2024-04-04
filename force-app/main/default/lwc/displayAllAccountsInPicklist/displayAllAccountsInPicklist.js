import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/fetchAccounts.fetchAccounts';
export default class DisplayAllAccountsInPicklist extends LightningElement {
    @wire(getAccounts) Accounts;
}