let firstNumber = "";
let secondNumber = "";
let operator = "";
let secondPart = "";

const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".btn");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");
const cancel = document.querySelector("#cancel");
const decimal = document.querySelector("#decimal");

function add(a, b) {
    return Number(a + b);
}

function substract(a, b) {
    return Number(a - b);
}

function multiply(a, b) {
    return Number(a * b);
}

function divide(a, b) {
    if (b == 0) return "Do not divide by 0";
    return Number(a / b);
}

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return substract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
    }
}

function populate(event) {
    if (screen.textContent === "0" || secondPart === true) {
        screen.textContent = "";
        secondPart = false;
        decimal.classList.remove("decimal");
    } else if (screen.textContent === "Do not divide by 0") {
        clearAll();
        screen.textContent = "";
    }
    screen.textContent += event.target.textContent;
    checkDecimal();

}

function saveOperator(element) {
    if (operator !== "") {
        calculate();
    }
    firstNumber = Number(screen.textContent);
    operator = element.target.textContent;
    secondPart = true;
}

function updateScreen() {
    secondNumber = Number(screen.textContent);
    const equation = operate(firstNumber, secondNumber, operator);
    const result = Number.isInteger(equation) ? equation : equation.toFixed(6);
    screen.textContent = result;
}

function clearAll() {
    secondPart = false;
    firstNumber = "";
    secondNumber = "";
    operator = "";
    decimal.classList.remove("decimal");
    decimal.disabled = false;
    screen.textContent = "0";
}

function cancelOne() {
    textArray = screen.textContent.split("");
    textArray.pop();
    screen.textContent = textArray.join("");
    checkDecimal();
}

function calculate() {
    updateScreen();
}

function calculateEquals() {
    updateScreen();
    secondPart = false;
    firstNumber = "";
    secondNumber = "";
    operator = "";
}

function checkDecimal() {
    if (screen.textContent.includes(".")) {
        decimal.classList.add("decimal");
        decimal.disabled = true;
    } else {
        decimal.classList.remove("decimal");
        decimal.disabled = false;
    }
}

buttons.forEach(button => {
    if (button.classList.contains("number")) {
        button.addEventListener('click', populate);
    }

    if (button.classList.contains("operation")) {
        button.addEventListener('click', saveOperator);  
    }  
});



equals.addEventListener('click', calculateEquals);
clear.addEventListener('click', clearAll);
cancel.addEventListener('click', cancelOne);