import { LightningElement, track } from 'lwc';

export default class Calculator extends LightningElement {


    num1;
    num2;
    result;
    @track operand;
    values(event){
        if(event.target.name === "num1"){
            this.num1= parseFloat(event.target.value);
        }else{
            this.num2=parseFloat(event.target.value);
        }
    }
    selectOperand(event){
        const selectedOperation = event.target.value;
        console.log(selectedOperation)
        switch (selectedOperation) {
          case "Addition":
            this.operand = "+";
            break;
          case "Substraction":
            this.operand = "-";
            break;
          case "Multiplication":
            this.operand = "*";
            break;
          case "Division":
            this.operand = "/";
            break;   
        }
    }
     calculateValue(event) {
        console.log(this.operand, this.num1, this.num2)
        if (this.operand === "+") {
            this.result = this.num1 + this.num2;
          } else if (this.operand === "-") {
            this.result = this.num1 - this.num2;
          } else if (this.operand === "*") {
            this.result = this.num1 * this.num2;
          } else if (this.operand === "/") {
            if (this.num2 === 0) {
              this.result = `CANNOT DIVIDE BY 0`;
            } else {
              this.result = this.num1 / this.num2;
            }
          } else {
            this.result = "PLEASE ENTER A VALID OPERAND";
          } 
    }
}