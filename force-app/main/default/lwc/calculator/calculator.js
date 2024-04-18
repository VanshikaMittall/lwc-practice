import { LightningElement } from 'lwc';
// num1;
// num2;
export default class Calculator extends LightningElement {
    // handleSelectChange(event) {
    //     const selectedOperation = event.target.value;
    //     switch (selectedOperation) {
    //       case "Addition":
    //         this.operand = "+";
    //         break;
    //       case "Subtraction":
    //         this.operand = "-";
    //         break;
    //       case "Multiplication":
    //         this.operand = "*";
    //         break;
    //       case "Division":
    //         this.operand = "/";
    //         break;
    //     }
    //   }
    //   calculateValue() {
    //       if (this.operand === "+") {
    //         this.result = `RESULT: ${this.num1 + this.num2}`;
    //       } else if (this.operand === "-") {
    //         this.result = `RESULT: ${this.num1 - this.num2}`;
    //       } else if (this.operand === "*") {
    //         this.result = `RESULT: ${this.num1 * this.num2}`;
    //       } else if (this.operand === "/") {
    //         if (this.num2 === 0) {
    //           this.result = `CANNOT DIVIDE BY 0`;
    //         } else {
    //           this.result = `RESULT: ${this.num1 / this.num2}`;
    //         }
    //       } else {
    //         this.result = "PLEASE ENTER A VALID OPERAND";
    //       }
    //   }    
}