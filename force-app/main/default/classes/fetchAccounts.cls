public with sharing class fetchAccounts {
    @AuraEnabled (cacheable=true)
    
    public static List<Account> fetchAccounts() {
        return [SELECT Id FROM Account LIMIT 49999];
    }
}