const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (!isNaN(value) || value === '.') {
      currentInput += value;
      display.textContent = currentInput;
    } else if (value === 'AC') {
      currentInput = '';
      previousInput = '';
      operator = '';
      display.textContent = '0';
    } else if (value === '=') {
      if (previousInput && operator) {
        currentInput = eval(previousInput + operator + currentInput);
        display.textContent = currentInput;
        previousInput = '';
        operator = '';
      }
    } else {
      if (currentInput) {
        previousInput = currentInput;
        operator = value;
        currentInput = '';
      }
    }
  });
});
