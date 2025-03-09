document.addEventListener('DOMContentLoaded', function () {
  const display = document.getElementById('display');
  let currentInput = '';

  document
    .querySelectorAll('.round, .gray, .orange, .wide')
    .forEach((button) => {
      button.addEventListener('click', function () {
        const value = this.getAttribute('data-value');

        if (value === '=') {
          try {
            currentInput = eval(
              currentInput.replace('×', '*').replace('÷', '/')
            );
            display.textContent = currentInput;
          } catch (e) {
            display.textContent = 'Error';
            currentInput = '';
          }
        } else if (value === 'AC') {
          currentInput = '';
          display.textContent = '0';
        } else if (value === 'back') {
          currentInput = currentInput.slice(0, -1);
          display.textContent = currentInput || '0';
        } else {
          currentInput += value;
          display.textContent = currentInput;
        }
      });
    });

  document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (!isNaN(key) || '+-*/.'.includes(key)) {
      currentInput += key.replace('*', '×').replace('/', '÷');
      display.textContent = currentInput;
    } else if (key === 'Enter') {
      try {
        currentInput = eval(currentInput.replace('×', '*').replace('÷', '/'));
        display.textContent = currentInput;
      } catch (e) {
        display.textContent = 'Error';
        currentInput = '';
      }
    } else if (key === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || '0';
    } else if (key === 'Escape') {
      currentInput = '';
      display.textContent = '0';
    }
  });
});
