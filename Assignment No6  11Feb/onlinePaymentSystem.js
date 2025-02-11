// ## Online Payment System
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Create Payment class with amount, date.
// Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
// Abstraction: Hide sensitive details like #cardNumber.
var PaymentEnum;
(function (PaymentEnum) {
    PaymentEnum["creditCard"] = "Credit Card";
    PaymentEnum["paypal"] = "Paypal";
    PaymentEnum["crypto"] = "Crypto";
})(PaymentEnum || (PaymentEnum = {}));
var Payment = /** @class */ (function () {
    function Payment(paymentType) {
        this.paymentType = paymentType;
        console.log("Payment with ".concat(paymentType, " is getting Started."));
    }
    return Payment;
}());
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    function CreditCardPayment(amount, date, cardNumber, paymentType) {
        var _this = _super.call(this, paymentType) || this;
        _this.amount = amount;
        _this.date = date;
        _this.cardNumber = cardNumber;
        return _this;
    }
    Object.defineProperty(CreditCardPayment.prototype, "CardNumber", {
        get: function () {
            var hashCardNumber = this.cardNumber.split('-');
            return "****-****-****-".concat(hashCardNumber.slice(-1));
        },
        enumerable: false,
        configurable: true
    });
    CreditCardPayment.prototype.processPayment = function () {
        return "On Credit Card No. ".concat(this.CardNumber, " Payment of ").concat(this.amount, " processed on ").concat(this.date.toLocaleString(), ".");
    };
    return CreditCardPayment;
}(Payment));
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(amount, date, email, paymentType) {
        var _this = _super.call(this, paymentType) || this;
        _this.amount = amount;
        _this.date = date;
        _this.email = email;
        return _this;
    }
    Object.defineProperty(PayPalPayment.prototype, "Email", {
        get: function () {
            var splitPart = this.email.split('@');
            return "***@".concat(splitPart[1]);
        },
        enumerable: false,
        configurable: true
    });
    PayPalPayment.prototype.processPayment = function () {
        return "Paypal Payment of $".concat(this.amount, " processed on ").concat(this.date.toLocaleString(), " via ").concat(this.Email);
    };
    return PayPalPayment;
}(Payment));
var CryptoPayment = /** @class */ (function (_super) {
    __extends(CryptoPayment, _super);
    function CryptoPayment(amount, date, walletAddress, paymentType) {
        var _this = _super.call(this, paymentType) || this;
        _this.amount = amount;
        _this.date = date;
        _this.walletAddress = walletAddress;
        return _this;
    }
    CryptoPayment.prototype.processPayment = function () {
        return "Crypto Payment of $ ".concat(this.amount, " processed on ").concat(this.date.toLocaleString(), " to wallet ").concat(this.walletAddress);
    };
    return CryptoPayment;
}(Payment));
var creditCardPayment = new CreditCardPayment(200, new Date("2025-02-04"), "1234-5678-9012-3456", PaymentEnum.creditCard);
console.log(creditCardPayment.processPayment());
console.log('');
var paypalPayment = new PayPalPayment(150, new Date("2025-02-04"), "abc@xyz.com", PaymentEnum.paypal);
console.log(paypalPayment.processPayment());
console.log('');
var cryptoPayment = new CryptoPayment(500, new Date("2025-02-04"), "0xABC123456789XYZ", PaymentEnum.crypto);
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
