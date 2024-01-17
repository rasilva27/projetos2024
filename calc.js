document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.calculator__display');
    let firstOperand = '';
    let operator = '';
    let waitingForSecondOperand = false;

    function inputNumber(number) {
        if (waitingForSecondOperand) {
            display.textContent = number;
            waitingForSecondOperand = false;
        } else {
            display.textContent += number;
        }
    }

    function inputOperator(nextOperator) {
        const inputValue = parseFloat(display.textContent);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === '') {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation();
            display.textContent = result;
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    function performCalculation() {
        const inputValue = parseFloat(display.textContent);
        switch (operator) {
            case 'add':
                return firstOperand + inputValue;
            case 'subtract':
                return firstOperand - inputValue;
            case 'multiply':
                return firstOperand * inputValue;
            case 'divide':
                if (inputValue !== 0) {
                    return firstOperand / inputValue;
                } else {
                    alert('Não é possível dividir por zero.');
                    clearCalculator();
                    return NaN;
                }
            default:
                return inputValue;
        }
    }

    function clearCalculator() {
        display.textContent = '0';
        firstOperand = '';
        operator = '';
        waitingForSecondOperand = false;
    }

    document.querySelectorAll('.key--number').forEach(function(button) {
        button.addEventListener('click', function() {
            inputNumber(button.textContent);
        });
    });

    document.querySelectorAll('.key--operator').forEach(function(button) {
        button.addEventListener('click', function() {
            inputOperator(button.dataset.action);
        });
    });

    document.querySelector('.key--decimal').addEventListener('click', function() {
        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }
    });

    document.querySelector('.key--clear').addEventListener('click', clearCalculator);

    document.querySelector('.key--equal').addEventListener('click', function() {
        if (operator && firstOperand !== '') {
            display.textContent = performCalculation();
            operator = '';
            waitingForSecondOperand = false;
        }
    });
});
