import { LightningElement ,wire,api} from 'lwc';
import AccountToContact from '@salesforce/apex/FetchContactsfromAccount.fetchContact';
export default class DisplayContactsRelatedToAccount extends LightningElement {
    @api recordId;
    @wire (AccountToContact ,{accId:'$recordId'}) contacts;
}