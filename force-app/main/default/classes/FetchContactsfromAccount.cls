public with sharing class FetchContactsfromAccount {
   @AuraEnabled(cacheable=true)
    public static List<Contact>  fetchContact(Id accId){
        List<Contact> relatedContact = [Select Id, Firstname, LastName, AccountId FROM Contact WHERE AccountId=:accId  WITH SECURITY_ENFORCED];
        return relatedContact;
    }     
}