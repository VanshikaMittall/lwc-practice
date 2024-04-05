public with sharing class FetchContactsfromAccount {

    @AuraEnabled(cacheable=true)
    public static List<Account>  fetchAccount(){
        List<Account> accountList = [Select Id, Name FROM Account WITH SECURITY_ENFORCED];
        return accountList;
    }

   @AuraEnabled(cacheable=true)
    public static List<Contact>  fetchContact(string accId){
        List<Contact> relatedContact = [Select Id, Firstname, LastName, Email, AccountId FROM Contact WHERE AccountId=:accId  WITH SECURITY_ENFORCED];
        return relatedContact;
    }     
}