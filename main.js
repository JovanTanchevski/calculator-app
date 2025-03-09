document.addEventListener('DOMContentLoaded', function () {
  const display = document.querySelector('.display');
  let currentInput = '';

  document.querySelectorAll('.round').forEach((button) => {
    button.addEventListener('click', function () {
      const value = this.textContent.trim();

      if (value === '=') {
        evaluateExpression();
      } else if (value === 'AC') {
        clearDisplay();
      } else if (value === '+/-') {
        toggleSign();
      } else if (value === '%') {
        percentage();
      } else {
        handleInput(value);
      }
    });
  });

  document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
      handleInput(key);
    } else if (key === 'Enter') {
      event.preventDefault();
      evaluateExpression();
    } else if (key === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
    } else if (key === 'Escape') {
      clearDisplay();
    }
  });

  function handleInput(value) {
    if (['×', '÷'].includes(value)) {
      value = value === '×' ? '*' : '/';
    }
    if (
      ['+', '-', '*', '/'].includes(value) &&
      ['+', '-', '*', '/'].includes(currentInput.slice(-1))
    ) {
      return;
    }
    currentInput += value;
    updateDisplay(currentInput);
  }

  function evaluateExpression() {
    try {
      if (!currentInput) return;
      let result = eval(currentInput);
      if (!isFinite(result)) throw new Error();
      currentInput = String(result);
      updateDisplay(currentInput);
    } catch (e) {
      updateDisplay('Error');
      currentInput = '';
    }
  }

  function clearDisplay() {
    currentInput = '';
    updateDisplay('0');
  }

  function toggleSign() {
    if (currentInput) {
      currentInput = currentInput.startsWith('-')
        ? currentInput.slice(1)
        : '-' + currentInput;
      updateDisplay(currentInput);
    }
  }

  function percentage() {
    if (currentInput) {
      currentInput = String(parseFloat(currentInput) / 100);
      updateDisplay(currentInput);
    }
  }

  function updateDisplay(value) {
    display.textContent = value;
  }
});
