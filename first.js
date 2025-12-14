const addition = (a,b) => a + b;
const subtraction = (a,b) => a - b; 
const multiplication = (a,b) => a * b; 
const division = (a,b) => {
  if(b == 0 ){
    return "Zero Divide Error";
  } else {
    return a / b;
  }
};  

let firstNumber = ""; 
let operation = "";
let secondNumber = ""; 
let resultDisplayed = false;

function operate(operation, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch(operation){
    case '+' : return addition(num1, num2);
    case '-' : return subtraction(num1, num2); 
    case '*' : return multiplication(num1, num2); 
    case '/' : return division(num1, num2); 
  }
}

function handleDigitClick(digit){
  if (resultDisplayed) {
    display.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operation = "";
    resultDisplayed = false;
  }

  if(operation === ""){
    firstNumber += digit;
    display.textContent = firstNumber;
  } else {
    secondNumber += digit;
    display.textContent = secondNumber;
  }
}

function handleOperaterClick(operater){ 
  if(firstNumber === "") return;

  if(operation !== "" && secondNumber !== "") {
    let result = operate(operation, firstNumber, secondNumber);
    result = roundResult(result);
    display.textContent = result;

    firstNumber = result.toString();
    secondNumber = "";
  }
  operation = operater;
  resultDisplayed = false;
}

function handleEqualtoClick(){
  if(firstNumber !== "" && operation !== "" && secondNumber !== "") {
    let result = operate(operation, firstNumber, secondNumber);
    result = roundResult(result);
    display.textContent = result;

    firstNumber = result.toString();
    secondNumber = "";
    operation = "";
    resultDisplayed = true;
  }
}

function handleClearclick() {
  firstNumber = "";
  secondNumber = "";
  operation = "";
  display.textContent = "";
  resultDisplayed = false;
}

function roundResult(number) {
  return Math.round(number * 100000) / 100000;
}


const display = document.querySelector(".display");

const digits = document.querySelectorAll(".digit");
digits.forEach(btn => {
  btn.addEventListener("click", () => handleDigitClick(btn.textContent));
});

const operators = document.querySelectorAll(".operater");
operators.forEach(btn => {
  btn.addEventListener("click", () => handleOperaterClick(btn.textContent));
});

const equalBtn = document.querySelector(".equalto");
equalBtn.addEventListener("click", handleEqualtoClick);

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", handleClearclick);
  