import { LightningElement, api, track, wire} from 'lwc';
//import fetchCurrencyChange from '@salesforce/apex/fetchCurrencyChangeValues.fetchCurrencyChange';
import { getRecord ,getFieldValue } from "lightning/uiRecordApi";
import Currency from "@salesforce/schema/Opportunity.Currency_Type__c";
import Field from '@salesforce/schema/AccountHistory.Field';

const columns=[
    {label:'CurrencyType' ,fieldName : 'key'},
    {label:'ExchangeRate' , fieldName: 'value'}
]
export default class currencyExchange extends LightningElement {


    exchangeRates = [];
    columns=columns;
    @track searchKey='';
    @track initialRates;
    @api recordId;
    @track picklistSelected='USD';
    totalRecords = 0; 
    pageSize=10; 
    totalPages; 
    pageNumber = 1;
   @track recordsToDisplay=[];
    // connectedCallback()
    //  {
     
    //  }

       @wire (getRecord,{oppId: '$recordId', Fields: [Currency]})fetchingPickListValues({data})
       {
                if(data)
                {
                    this.picklistSelected = getFieldValue(data ,Currency);
                    console.log(this.picklistSelected);
                    this.fetchSymbols();
                }
     }
     

        fetchSymbols(){
        //const apiKey = '1e7b45cda023ce23e1a47e93';
        const apiUrl = 'https://v6.exchangerate-api.com/v6/1e7b45cda023ce23e1a47e93/latest/';
       try{
            let response=  fetch(apiUrl + this.picklistSelected);
            console.log(apiUrl + this.picklistSelected);
            if(!response.ok){
                throw new Error('Network response is not ok')
            }
             const data=  response.json();
             console.log(data);
            const parseData = JSON.parse(JSON.stringify(data.conversion_rates));
            //this.Data=Object.keys(parseData).map(Key =>({key: Key , value: parseData[Key]}));
            //const data= await response.json();
            //console.log(parseData);
           

            this.exchangeRates =Object.keys(data.conversion_rates).map(key =>({key: key , value: data.conversion_rates[key]}));
            console.log(this.exchangeRates);
          //  this.initialRates= [...this.exchangeRates];

            this.totalRecords = this.exchangeRates.length;
            this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
            this.recordsToDisplay=this.exchangeRates.slice(0,10);
            
           
        }catch(error){
            console.log(error);
        }
    }
    get bDisableFirst() {
        return this.pageNumber == 1;
    }
    get bDisableLast() {
        return this.pageNumber == this.totalPages;
    }
    
    previousPage() {
        if(this.pageNumber!==1) {
            this.pageNumber-- ;
            this.recordsToDisplay = this.exchangeRates.slice(((this.pageNumber-1)* 10 ), this.pageNumber *10);
          }
    }
    nextPage() {
        if(this.pageNumber < this.totalPages)
    {
      this.pageNumber ++ ;
      this.changeData = this.Data.slice(((this.pageNumber-1)*10), this.pageNumber *10);
    }
    }

    // paginationHelper() {
    //     this.recordsToDisplay = [];
        
    //     this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        
    //     if (this.pageNumber <= 1) {
    //         this.pageNumber = 1;
    //     } else if (this.pageNumber >= this.totalPages) {
    //         this.pageNumber = this.totalPages;
    //     }
        
    //     for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
    //         if (i === this.totalRecords) {
    //             break;
    //         }
    //         this.recordsToDisplay.push(this.exchangeRates[i]);
    //     }
    // }
    handleChange(event){
        this.searchKey = event.target.value.toUpperCase();
        let val=[];
        if(this.searchKey )
        {
            val = this.exchangeRates.filter(rate => rate.key.toUpperCase().includes(this.searchKey) );
            this.recordsToDisplay=val;
        }else
        {
            this.pageNumber=1;
            this.recordsToDisplay=this.exchangeRates.slice(0,10);
        }
    }

}