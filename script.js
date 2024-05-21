const display = document.querySelector('.display');
const expressionDis = document.querySelector('.expression');
const digitsBtn = document.querySelectorAll('.digits');
const operatorsBtn = document.querySelectorAll('.operators');
const pointBtn = document.querySelector('.point');
const percentBtn = document.querySelector('.percentage');
const clearBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.delete');
const equalBtn = document.querySelector('.equal');

let numberA = '';
let numberB = '';
let operator = '';

digitsBtn.forEach((dig) => {
  dig.addEventListener('click', setDigit);
});

operatorsBtn.forEach((opr) => {
  opr.addEventListener('click', setOperator);
});

function setDigit() {
  const digitTarget = this.value;

  if (operator) {
    if (numberB !== '0') {
      numberB += digitTarget;
      display.textContent += digitTarget;
    }
  } else {
    numberA = display.textContent === '0'
      ? digitTarget
      : numberA += digitTarget;
    display.textContent = numberA;
  }
}

function setOperator() {
  const operatorTarget = this.value;
  const currentDisplay = display.textContent;

  if (operator) {
    if (operator === currentDisplay.at(-1)) {
      display.textContent = currentDisplay.replace(operator, operatorTarget)
      operator = operatorTarget;
    }
  } else {
    display.textContent += operatorTarget;
    operator = operatorTarget;
  }
}