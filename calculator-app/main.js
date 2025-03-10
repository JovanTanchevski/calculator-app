import BasicCalculator from './calculator-types/BasicCalculator.js';
document.addEventListener('DOMContentLoaded', function () {
  const display = document.querySelector('.display');
  new BasicCalculator(display);
});
