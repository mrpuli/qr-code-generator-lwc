import { LightningElement } from 'lwc';
import getQrCode from '@salesforce/apex/QrCodeController.getQrCode';
import { loadScript } from 'lightning/platformResourceLoader';
import jsPDF from '@salesforce/resourceUrl/jsPDF';

export default class QrCodeComponent extends LightningElement {
    qrCodeBase64;
    errorMsg;
    showSpinner = false;
    jsPdfLoaded = false;
    qrURL;

    handleReset(){
        this.qrURL = null;
        this.qrCodeBase64 = null;
        this.errorMsg = null;
        this.showSpinner = false;
        this.template.querySelector('.qrUrl').value = null;
    }

    async generateQR(){
        this.qrURL = this.template.querySelector('.qrUrl').value;
        this.showSpinner = true;
        try{
            let response = await getQrCode( { qrUrl : this.qrURL } );
            let responseObj = JSON.parse(response);
            console.log('response', responseObj);
            
            this.errorMsg = responseObj['error'];
            this.qrCodeBase64 = (responseObj['qr_code_base64'] ? ('data:image/png;base64, ' + responseObj['qr_code_base64']) : null);
            this.showSpinner = false;
        }catch(error){
            console.log('error', error);
            this.errorMsg = error;
            this.qrCodeBase64 = null;
            this.showSpinner = false;
        }
    }

    handleExportQrPdf(){
        if(!this.jsPdfLoaded){
            loadScript(this, jsPDF)
                .then(result => {
                    this.jsPdfLoaded = true;
                    this.createPDF();
                })
                .catch(error => {
                    console.log('Error loading jsPDF', error);
                });
        }
    }

    createPDF(){
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(`QR code for ${this.qrURL}`, 10, 20);
        doc.addImage(this.qrCodeBase64, 'PNG', 10, 40, 180, 160);
        doc.save("QR.pdf");
    }

    get showErrorMessage(){
        if(this.errorMsg){
            return true;
        }else{
            return false;
        }
    }

    get showQrCode(){
        if(this.qrCodeBase64){
            return true;
        }else{
            return false;
        }
    }
}