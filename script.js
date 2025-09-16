document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let operator = null;
    let previousInput = '';
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.textContent;

            // Lidar com o botão de limpar
            if (e.target.classList.contains('clear')) {
                currentInput = '';
                operator = null;
                previousInput = '';
                display.value = '';
                return;
            }

            // Lidar com o botão de igual
            if (e.target.classList.contains('equal')) {
                if (currentInput !== '' && previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.value = currentInput;
                    previousInput = '';
                    operator = null;
                    shouldResetDisplay = true;
                }
                return;
            }

            // Lidar com operadores
            if (e.target.classList.contains('operator')) {
                if (currentInput === '' && previousInput === '') return;
                
                if (previousInput !== '') {
                    currentInput = calculate(previousInput, currentInput, operator);
                }
                
                operator = value;
                previousInput = currentInput;
                currentInput = '';
                display.value = previousInput + ' ' + operator;
                shouldResetDisplay = true;
                return;
            }

            // Lidar com números e ponto decimal
            if (shouldResetDisplay) {
                currentInput = value;
                shouldResetDisplay = false;
            } else {
                currentInput += value;
            }
            display.value = currentInput;
        });
    });

    function calculate(num1, num2, op) {
        let result;
        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);

        if (isNaN(n1) || isNaN(n2)) return '';

        switch(op) {
            case '+':
                result = n1 + n2;
                break;
            case '-':
                result = n1 - n2;
                break;
            case '*':
                result = n1 * n2;
                break;
            case '/':
                result = n1 / n2;
                break;
            default:
                return num2;
        }

        return result.toString();
    }
});
