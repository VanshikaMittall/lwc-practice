public with sharing class SendEmailController {
    @AuraEnabled(cacheable=true)
    public static void sendEmail(String emailDetailStr){
        EmailWrapper emailDetails = (EmailWrapper) JSON.deserialize(emailDetailStr, EmailWrapper.class);
        try {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(emailDetails.toAddress);
        if(!emailDetails.bccAddress.isEmpty()){
            mail.setBccAddresses(emailDetails.bccAddress);
        }
        if(!emailDetails.ccAddress.isEmpty()){
            mail.setCcAddresses(emailDetails.ccAddress);
        }
        mail.setSubject(emailDetails.subject);
        mail.setHtmlBody(emailDetails.body);

        List<Messaging.EmailFileAttachment> attachments = new List<Messaging.EmailFileAttachment>();
        for(String fileContent : emailDetails.file) {
            Messaging.EmailFileAttachment attachment = new Messaging.EmailFileAttachment();
            attachment.setFileName('attchment.png');  // Set the file name
            attachment.setBody(EncodingUtil.base64Decode(fileContent));  // Convert string to blob
            attachment.setContentType('image/png');
            attachments.add(attachment);
        }
        // Set file attachments
        mail.setFileAttachments(attachments);
            
        // Send the email
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{ mail });

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    Class EmailWrapper {
        public List<String> toAddress;
        public List<String> ccAddress;  
        public List<String> bccAddress;     
        public String subject; 
        public String body;
        public List<String> file;
    }
}