#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//intialize user balance and pin code
let myBalance = 10000; // Dollar
let myPin = 1234;
console.log(chalk.blue("\n \t Welcome to craftcode_Noman  - ATM Machine \n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code"),
    },
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("Pin is Correct ,Login Succesfully!"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.yellow("Please select an option"),
            choices: ["Withdraw Amount", "Check Balance"],
        },
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: chalk.yellow("Select a Withdrawal method:"),
                choices: ["Fast Cash", "Enter Amount"],
            },
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastcashAnswer = await inquirer.prompt([
                {
                    name: "fastcash",
                    type: "list",
                    message: chalk.yellow("Select Amount:"),
                    choices: [1000, 2000, 5000, 10000],
                },
            ]);
            if (fastcashAnswer.fastcash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastcashAnswer.fastcash;
                console.log(`${fastcashAnswer.fastcash} withdrawn successfully`);
                console.log(chalk.greenBright(`Your remaining balance is: ${myBalance}`));
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAnswer = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: chalk.yellow("Enter the amount to withdraw:"),
                },
            ]);
            if (amountAnswer.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAnswer.amount;
                console.log(chalk.greenBright(`${amountAnswer.amount} withdrawn successfully`));
                console.log(chalk.greenBright(`Your remaining balance is: ${myBalance}`));
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(chalk.greenBright(`Your account balance is: ${myBalance}`));
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try Again!"));
}
