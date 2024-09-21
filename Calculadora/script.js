// Seleção de elementos da interface
const resultDisplay = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

// Variáveis de estado
let currentNumber = "";
let firstOperand = null;
let operator = null;
let shouldRestart = false;

// Funções auxiliares
function updateDisplay(clear = false) {
    resultDisplay.innerText = clear ? 0 : currentNumber.replace(".", ",");
}

function resetCalculator() {
    currentNumber = "";
    firstOperand = null;
    operator = null;
    shouldRestart = false;
    updateDisplay(true);
}

// Manipulação de números
function addDigit(digit) {
    if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

    if (shouldRestart) {
        currentNumber = digit;
        shouldRestart = false;
    } else {
        currentNumber += digit;
    }

    updateDisplay();
}

// Operadores e cálculo
function setOperator(newOperator) {
    if (currentNumber) {
        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }
    operator = newOperator;
}

function performCalculation() {
    if (operator === null || firstOperand === null) return;

    const secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break;
        case "X":
            resultValue = firstOperand * secondOperand;
            break;
        case "÷":
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    // Arredondamento para até 5 casas decimais
    currentNumber = resultValue.toFixed(5).replace(/\.?0+$/, "");

    resetCalculationState();
    updateDisplay();
}

function resetCalculationState() {
    operator = null;
    firstOperand = null;
    shouldRestart = true;
}

// Função para limpar o display
function clearDisplay() {
    resetCalculator();
}

// Função para aplicar porcentagem
function applyPercentage() {
    let percentageResult = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operator)) {
        percentageResult *= firstOperand || 1;
    }

    currentNumber = percentageResult.toFixed(5).replace(/\.?0+$/, "");
    updateDisplay();
}

// Função para inverter sinal
function toggleSign() {
    currentNumber = (parseFloat(currentNumber || firstOperand) * -1).toString();
    updateDisplay();
}

// Tratamento de eventos
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonText = button.innerText;

        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "X", "÷"].includes(buttonText)) {
            setOperator(buttonText);
        } else if (buttonText === "=") {
            performCalculation();
        } else if (buttonText === "C") {
            clearDisplay();
        } else if (buttonText === "±") {
            toggleSign();
        } else if (buttonText === "%") {
            applyPercentage();
        }
    });
});
