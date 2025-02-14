// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    // Example: createAccount(name, initialDeposit)

   createAccount(name, initialDeposit){
        const account = new Account (name, initialDeposit);
        this.accounts.push(account);
        return account;
    }
}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    // Example: deposit(amount) 
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }
    
    deposit(amount) {

        if (amount <= 0) {
            console.log('Deposit amount must be greater than zero.');
            return;
        }

        this.balance= this.balance+amount; 
        this.transactionHistory.push({transactionType: 'Deposit', amount: amount});
        console.log (`${this.name} deposited ${amount}. New balance:$ ${this.balance}`);
      
        
    }

    // Example: withdraw(amount)
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }

    withdraw(amount){
        
        if (amount <= 0) {
            console.log('Withdrawal amount must be greater than zero.');
            return;}

        else if (amount > this.balance) {
            console.log(`${this.name}, insufficient funds. Current balance: $${this.balance}`);
            return;}
            
        this.balance= this.balance - amount;        
        this.transactionHistory.push({transactionType: 'Withdrawal', amount: amount});
        console.log (`${this.name} withdrew ${amount}. New balance:$ ${this.balance}`)

    }

    // Example: transfer(amount, recipientAccount)
    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }

    transfer(amount,recipientAccount){


        if (amount <= 0) {
            console.log('Transfer amount must be greater than zero.');
            return;
        }

        if (amount > this.balance) {
            console.log(`${this.name}, insufficient funds to transfer $${amount} to ${recipientAccount.name}.`);
            return; 
        }

        this.balance = this.balance- amount;
        recipientAccount.balance =  recipientAccount.balance+ amount;
        

        this.transactionHistory.push({ transactionType: 'Transfer', amount, to: recipientAccount.name })
        console.log(`${this.name} transfered ${amount} to ${recipientAccount.name}`)
        recipientAccount.transactionHistory.push( { transactionType: 'Received', amount, from: this.name })
        console.log(`${recipientAccount.name } Received ${amount} from ${this.name}` )
    }

    
    // Example: checkBalance()

    checkBalance(){

        return this.balance;

    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
