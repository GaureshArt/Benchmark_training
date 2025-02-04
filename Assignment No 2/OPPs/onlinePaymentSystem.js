class Payment {
  constructor(amount, date) {
    this.amount = amount;
    this.date = date;
  }

  processPayment() {}
}

class CreditCardPayment extends Payment {
  #cardNumber;

  constructor(amount, date, cardNumber) {
    super(amount, date);
    this.#cardNumber = cardNumber;
  }

  processPayment() {
    return `On Credit Card No. ${this.#cardNumber} Payment of ${
      this.amount
    } processed on ${this.date}.`;
  }
}

class PayPalPayment extends Payment {
  #email;
  constructor(amount, date, email) {
    super(amount, date);
    this.#email = email;
  }
  processPayment() {
    return `PayPal Payment of $${this.amount} processed on ${this.date} via ${this.#email}.`;
  }
}

class CryptoPayment extends Payment {
  #walletAddress;
  constructor(amount, date, walletAddress) {
    super(amount, date);
    this.#walletAddress = walletAddress;
  }
  processPayment() {
    return `Crypto Payment of $${this.amount} processed on ${
      this.date
    } to wallet ${this.#walletAddress}.`;
  }
}

const creditCardPayment = new CreditCardPayment(200,"2025-02-04","1234-5678-9012-3456");
console.log(creditCardPayment.processPayment());

const paypalPayment = new PayPalPayment(150, "2025-02-04", "abc@xyz.com");
console.log(paypalPayment.processPayment());

const cryptoPayment = new CryptoPayment(500, "2025-02-04", "0xABC123456789XYZ");
console.log(cryptoPayment.processPayment());
