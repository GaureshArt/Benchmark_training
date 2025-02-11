// ## Online Payment System

// Create Payment class with amount, date.
// Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
// Abstraction: Hide sensitive details like #cardNumber.

enum PaymentEnum{
    creditCard = 'Credit Card',
    paypal = 'Paypal',
    crypto = 'Crypto'
}

 abstract class Payment{
    abstract amount:number;
    abstract date:Date;
    paymentType:PaymentEnum;
    constructor(paymentType:PaymentEnum){
        this.paymentType = paymentType;
        console.log(`Payment with ${this.paymentType} is getting Started.`)
    }
   abstract processPayment():string;
}


class CreditCardPayment extends Payment{
    constructor(public amount:number,public date:Date,private cardNumber:string,paymentType:PaymentEnum){
        super(paymentType);

    }
    get CardNumber(){
        const hashCardNumber = this.cardNumber.split('-');
        
        return `****-****-****-${hashCardNumber.slice(-1)}`;
    }
    processPayment():string {
        return `On Credit Card No. ${this.CardNumber} Payment of ${
      this.amount
    } processed on ${this.date.toLocaleString()}.`;
    }
}


class PayPalPayment extends Payment {
    constructor(public amount:number,public date:Date,private email:string,paymentType:PaymentEnum){
        super(paymentType);
    }
    get Email(){
        const splitPart = this.email.split('@');
        return `***@${splitPart[1]}`

    }
    processPayment(): string {
        return `Paypal Payment of $${this.amount} processed on ${this.date.toLocaleString()} via ${this.Email}`
    }
}


class CryptoPayment extends Payment {
    constructor(public amount:number,public date:Date,private walletAddress:string,paymentType:PaymentEnum){
        super(paymentType);

    }
    processPayment(): string {
        return `Crypto Payment of $ ${this.amount} processed on ${this.date.toLocaleString()} to wallet ${this.walletAddress}`
    }

}



const creditCardPayment = new CreditCardPayment(200,new Date("2025-02-04"),"1234-5678-9012-3456",PaymentEnum.creditCard);
console.log(creditCardPayment.processPayment());
console.log('')

const paypalPayment = new PayPalPayment(150, new Date("2025-02-04"), "abc@xyz.com",PaymentEnum.paypal);
console.log(paypalPayment.processPayment());
console.log('')

const cryptoPayment = new CryptoPayment(500, new Date("2025-02-04"), "0xABC123456789XYZ",PaymentEnum.crypto);
console.log(cryptoPayment.processPayment());



/*
output:
Payment with Credit Card is getting Started.
On Credit Card No. ****-****-****-3456 Payment of 200 processed on 4/2/2025, 5:30:00 am.

Payment with Paypal is getting Started.
Paypal Payment of $150 processed on 4/2/2025, 5:30:00 am via ***@xyz.com

Payment with Crypto is getting Started.
Crypto Payment of $ 500 processed on 4/2/2025, 5:30:00 am to wallet 0xABC123456789XYZ
*/