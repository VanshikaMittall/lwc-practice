public with sharing class fetchAccountRelatedOppCon {
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccounts(){
        try {
            return [SELECT Id,Name FROM Account];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> fetchOpportunities(Id accId){
        try {
            return[SELECT Id, AccountId, Name, StageName, CloseDate FROM Opportunity WHERE AccountId = :accId]; 
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
    @AuraEnabled(cacheable=true)
    public static List<Contact> fetchContacts(Id accId){
        try {
            return[SELECT Id, AccountId, FirstName, LastName, Email FROM Contact WHERE AccountId = :accId]; 
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}