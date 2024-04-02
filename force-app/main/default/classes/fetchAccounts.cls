public with sharing class fetchAccounts {
    @AuraEnabled (cacheable=true)
    
    public static List<Account> fetchAccounts( ) {
        return [SELECT Id ,Name FROM Account WITH SECURITY_ENFORCED];
    }
}