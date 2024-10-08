public with sharing class QrCodeController {
    public QrCodeController() {

    }

    @AuraEnabled
    public static String getQrCode(String qrUrl){
        if(String.isBlank(qrUrl)){
            return '{ "error" : "Please enter a valid url" }';
        }else{
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('callout:qrCodeAPI' + '?url=' + qrUrl);
            request.setHeader('Accept', 'application/json');
            request.setMethod('GET');
            HttpResponse response = http.send(request);
            return response.getBody();
        }
    }
}