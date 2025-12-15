const addition = (a,b) => a + b;
const subtraction = (a,b) => a - b; 
const multiplication = (a,b) => a * b; 
const division = (a,b) => b == 0 ? "Zero Divide Error" : a / b;

let firstNumber = ""; 
let operation = "";
let secondNumber = ""; 
let resultDisplayed = false;

const display = document.querySelector(".display");

function operate(op, num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  switch(op){
    case '+': return addition(num1, num2);
    case '-': return subtraction(num1, num2);
    case '*': return multiplication(num1, num2);
    case '/': return division(num1, num2);
  }
}

function handleDigitClick(digit){
  if(resultDisplayed){
    display.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operation = "";
    resultDisplayed = false;
  }

  if(digit === '.' && ((operation === "" && firstNumber.includes('.')) || (operation !== "" && secondNumber.includes('.')))) {
    return; // prevent multiple decimals
  }

  if(operation === ""){
    firstNumber += digit;
    display.textContent = firstNumber;
  } else {
    secondNumber += digit;
    display.textContent = secondNumber;
  }
}

function handleOperaterClick(op){
  if(op === 'x') op = '*';
  if(op === '÷') op = '/';

  if(firstNumber === "") return;

  if(operation !== "" && secondNumber !== "") {
    let result = operate(operation, firstNumber, secondNumber);
    result = roundResult(result);
    display.textContent = result;

    firstNumber = result.toString();
    secondNumber = "";
  }
  operation = op;
  resultDisplayed = false;
}

function handleEqualtoClick(){
  if(firstNumber !== "" && operation !== "" && secondNumber !== ""){
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
  if(typeof number === "number") return Math.round(number * 100000) / 100000;
  return number; // for Zero Divide Error
}

// Event listeners
document.querySelectorAll(".digit").forEach(btn => btn.addEventListener("click", () => handleDigitClick(btn.textContent)));
document.querySelectorAll(".operater").forEach(btn => btn.addEventListener("click", () => handleOperaterClick(btn.textContent)));
document.querySelector(".equalto").addEventListener("click", handleEqualtoClick);
document.querySelector(".clear").addEventListener("click", handleClearclick);
