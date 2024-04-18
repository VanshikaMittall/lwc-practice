public with sharing class fetchCurrencyChangeValues {
    @AuraEnabled(cacheable=true)
    public static String fetchCurrencyChange(String oppId){
        try {
            String result=[SELECT  Currency_Type__c FROM Opportunity WHERE Id=:oppId].Currency_Type__c;
            return result;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}