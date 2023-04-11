"use strict";

const display = document.getElementById("display");
let firstNumber = 0;
let secondNumber = 0;
let operator;

function main() {
    document.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === 'body' || e.target.tagName.toLowerCase() === 'div') return;

        if (e.target.classList.contains('number')) {
            fillNumberVariable(e.target.innerText);
        } else if(e.target.classList.contains('backspace')) {
            removeLastElementDisplay();
        } else if (e.target.classList.contains('clearCurrent')) {
            clearCurrent();
        } else if (e.target.classList.contains('clearAll')) {
            clearAll();
        } else if (e.target.classList.contains('operator')) {
            setOperator(e.target.innerText);
        } else if (e.target.classList.contains('equal')) {
            solve();
        }
    })
}

const fillNumberVariable = (number) => {
    if (!operator) {
        if (firstNumber === 0)
            firstNumber = number;
        else
            firstNumber += number;

        display.innerHTML = firstNumber;
    } else {
        if (secondNumber === 0)
            secondNumber = number;
        else
            secondNumber += number;

        display.innerHTML = `${firstNumber}${operator}${secondNumber}`;
    }
}

const setOperator = (op) => {
    if (firstNumber === 0) return;

    if(operator === undefined || operator === null) {
        operator = op;
        display.innerHTML += op;
    } else {
        let oldOperador = operator;
        operator = op;
        const newDisplay = display.innerHTML.replace(oldOperador, operator);
        display.innerHTML = newDisplay;
    }
}

const removeLastElementDisplay = () => {
    const operatorPosition = display.innerText.indexOf(operator);

    if(operatorPosition === -1) {
        firstNumber = display.innerText.substring(0, display.innerText.length - 1);
        display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
    } else if(operatorPosition !== -1 && secondNumber == 0) {
        operator = null;
        display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
    } else {
        secondNumber = display.innerText.substring(operatorPosition + 1, display.innerText.length - 1);
        display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
    }

    if(display.innerHTML == '')
        display.innerHTML = 0;
}

const clearAll = () => {
    firstNumber = 0;
    secondNumber = 0;
    operator = null;
    display.innerHTML = '';
}

const clearCurrent = () => {
    if(operator === undefined || operator === null) {
        firstNumber = 0;
        display.innerHTML = 0;
    } else {
        secondNumber = 0;
        display.innerHTML = firstNumber + operator;
    }
        
}

const solve = () => {
    let result = 0;

    switch (operator) {
        case "+":
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case "-":
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case "x":
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case "/":
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
    }

    display.innerHTML = result;
    firstNumber = result;
    secondNumber = 0;
    operator = null;
}

main();