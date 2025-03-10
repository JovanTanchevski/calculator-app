class BasicCalculator {
  constructor(displayElement) {
    this.display = displayElement;
    this.currentInput = '';
    this.init();
  }

  init() {
    document.querySelectorAll('.round').forEach((button) => {
      button.addEventListener('click', (event) =>
        this.handleButtonClick(event)
      );
    });

    document.addEventListener('keydown', (event) => this.handleKeyPress(event));
  }

  handleButtonClick(event) {
    const value = event.target.textContent.trim();

    switch (value) {
      case '=':
        this.evaluateExpression();
        break;
      case 'AC':
        this.clearDisplay();
        break;
      case '+/-':
        this.toggleSign();
        break;
      case '%':
        this.percentage();
        break;
      default:
        this.handleInput(value);
        break;
    }
  }

  handleKeyPress(event) {
    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
      this.handleInput(key);
    } else if (key === 'Enter') {
      event.preventDefault();
      this.evaluateExpression();
    } else if (key === 'Backspace') {
      this.currentInput = this.currentInput.slice(0, -1);
      this.updateDisplay(this.currentInput || '0');
    } else if (key === 'Escape') {
      this.clearDisplay();
    }
  }

  handleInput(value) {
    if (['×', '÷'].includes(value)) {
      value = value === '×' ? '*' : '/';
    }
    if (
      ['+', '-', '*', '/'].includes(value) &&
      ['+', '-', '*', '/'].includes(this.currentInput.slice(-1))
    ) {
      return;
    }
    this.currentInput += value;
    this.updateDisplay(this.currentInput);
  }

  evaluateExpression() {
    try {
      if (!this.currentInput) return;
      let result = eval(this.currentInput);
      if (!isFinite(result)) throw new Error();
      this.currentInput = String(result);
      this.updateDisplay(this.currentInput);
    } catch (e) {
      this.updateDisplay('Error');
      this.currentInput = '';
    }
  }

  clearDisplay() {
    this.currentInput = '';
    this.updateDisplay('0');
  }

  toggleSign() {
    if (this.currentInput) {
      this.currentInput = this.currentInput.startsWith('-')
        ? this.currentInput.slice(1)
        : '-' + this.currentInput;
      this.updateDisplay(this.currentInput);
    }
  }

  percentage() {
    if (this.currentInput) {
      this.currentInput = String(parseFloat(this.currentInput) / 100);
      this.updateDisplay(this.currentInput);
    }
  }

  updateDisplay(value) {
    this.display.textContent = value;
  }
}

export default BasicCalculator;
