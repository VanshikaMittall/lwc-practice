import { LightningElement, wire, api, track} from 'lwc';

import fetchAccounts from '@salesforce/apex/fetchAccountRelatedOppCon.fetchAccounts'
import fetchOpportunities from '@salesforce/apex/fetchAccountRelatedOppCon.fetchOpportunities'
import fetchContacts from '@salesforce/apex/fetchAccountRelatedOppCon.fetchContacts'

const Oppcolumns=[
    {label: 'Name', fieldName:"Name"},
    {label:'Stage', fieldName:"StageName"},
    {label:'Close Date', fieldName:"CloseDate"}
]
const Concolumns=[
    {label: 'First Name', fieldName:"FirstName"},
    {label:'Last Name', fieldName:"LastName"},
    {label:'Email', fieldName:"Email"}
]
export default class DisplayAccountsOppCon extends LightningElement {
    @track accId;
    @api Accounts=[];
    @wire (fetchAccounts) wiredAccounts({data,error}){
        if (data) {
            let arr=[];
            data.forEach(element => {
                arr.push(
                    {label: element.Name,
                    value: element.Id}
                )
            });
            this.Accounts=arr;
            console.log('acData-',this.Accounts);
        }
        if(error){
            this.error=error;
        }
    }
    handleChange(event){
        console.log(event.detail.value);
        this.accId=event.detail.value;
        console.log('accId', this.accId);
    }
    @track Oppcolumns=Oppcolumns;
    @api Oppdata=[];
    @track Concolumns=Concolumns;
    @api Condata=[];
   @wire(fetchOpportunities,{accId:'$accId'})wiredOpp({data,error}){
        if(data){
            this.Oppdata=data;
        }
        else if(error){
            this.error=error;
        }
   }
   @wire(fetchContacts,{accId:'$accId'})wiredCon({data,error}){
    if(data){
        this.Condata=data;
    }
    else if(error){
        this.error=error;
    }
}
}