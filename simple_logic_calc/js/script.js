const display = document.getElementById("display");
let firstNumber = 2;
let secondNumber = 3;
let operator = "";
let operatorPosition = 0;

document.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() == 'body') {
        return;
    }

    const elementValue = e.target.innerHTML;

    //adding element to display
    if (display.innerHTML == 0)
        display.innerHTML = elementValue;
    else
        display.innerHTML += elementValue;

    //if element is a operator, save first number
    switch (elementValue) {
        case "+":
        case "-":
        case "x":
        case "/":
            firstNumber = display.innerHTML.substring(0, display.innerHTML.length - 1);
            operator = display.innerHTML[display.innerHTML.length - 1];
            operatorPosition = display.innerHTML.length - 1;
            break;

    }

    //showing result if element is a equal
    if (elementValue == '=') {
        secondNumber = display.innerHTML.substring(operatorPosition + 1, display.innerHTML.length - 1);
        switch(operator) {
            case "+":
                display.innerHTML = sum();
                break;
            case "-":
                display.innerHTML = subtraction();
                break;
            case "x":
                display.innerHTML = multiplication();
                break;
            case "/":
                display.innerHTML = division();
                break;
        }
    }
        
})

const sum = () => {
    return Number(firstNumber) + Number(secondNumber);
}

const subtraction = () => {
    return Number(firstNumber) - Number(secondNumber);
}

const multiplication = () => {
    return Number(firstNumber) * Number(secondNumber);
}

const division = () => {
    return Number(firstNumber) / Number(secondNumber);
}