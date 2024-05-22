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

equalBtn.addEventListener('click', getResult);
clearBtn.addEventListener('click', clearAll);

function setDigit() {
  const digitTarget = this.value;

  if (equalBtn.value) {
    display.textContent = '0';
    equalBtn.value = '';
  }

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

  if (equalBtn.value) {
    display.textContent = equalBtn.value === 'error'
      ? 0
      : currentDisplay;
    equalBtn.value = '';
  }

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

function getResult() {
  if (!equalBtn.value) {
    let result;
    if (numberB) {
      result = operate(numberA, numberB, operator);
      equalBtn.value = result === 'error'
        ? 'error'
        : 'display';
      display.textContent = result === 'error'
        ? 'Can\'t divide by zero'
        : result;
      numberA = result === 'error'
        ? 0
        : result;
      numberB = '';
      operator = '';
    } else {
      result = numberA === ''
        ? 0
        : numberA
      equalBtn.value = 'display';
      display.textContent = result;
      operator = '';
    }
  }
}

function operate(numA, numB, operator) {
  let operateResult;
  numA = Number(numA);
  numB = Number(numB);

  switch (operator) {
    case '+':
      operateResult = numA + numB;
      break;
    case '-':
      operateResult = numA - numB;
      break;
    case '*':
      operateResult = numA * numB;
      break;
    case '/':
      operateResult = numB === 0
        ? 'error'
        : numA / numB;
      break;
  }

  return operateResult;
}

function clearAll() {
  numberA = '';
  numberB = '';
  operator = '';
  display.textContent = '0';
  equalBtn.value = '';
}