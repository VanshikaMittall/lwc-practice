public with sharing class getAllObjects {
    @AuraEnabled(cacheable=true)
    public static string getObjects(){
        try {
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}