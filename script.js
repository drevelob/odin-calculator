const display = document.querySelector('.display');
const expressionDis = document.querySelector('.expression');
const digitsBtn = document.querySelectorAll('.digits');
const operatorsBtn = document.querySelectorAll('.operators');
const pointBtn = document.querySelector('.point');
const percentBtn = document.querySelector('.percentage');
const clearBtn = document.querySelector('.clear');
const delBtn = document.querySelector('.delete');
const equalBtn = document.querySelector('.equal');
const themeBtn = document.querySelector('.theme');

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
pointBtn.addEventListener('click', setFloat);
percentBtn.addEventListener('click', getPercent);
delBtn.addEventListener('click', setDelete);
themeBtn.addEventListener('click', setTheme);

function setDigit() {
  const digitTarget = this.value;

  if (equalBtn.value) {
    display.textContent = '0';
    equalBtn.value = '';
    expressionDis.textContent = '';
    display.classList.remove('error');
    display.classList.remove('result');
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
  const MULTIPLY_SIGN = '\u00d7';
  const DIVIDE_SIGN = '\u00f7';
  const operatorTarget = this.value;
  const currentDisplay = display.textContent;
  expressionDis.textContent = '';

  if (numberB) {
    getResult();
    equalBtn.value = equalBtn.value === 'error'
      ? equalBtn.value
      : '';
  } else if (equalBtn.value) {
    display.textContent = equalBtn.value === 'error'
      ? 0
      : currentDisplay;
    equalBtn.value = '';
  }

  if (operator) {
    if (operator === '*') {
      operator = MULTIPLY_SIGN;
    } else if (operator === '/') {
      operator = DIVIDE_SIGN;
    }

    display.textContent = currentDisplay.replace(operator, operatorTarget)
    operator = operatorTarget;
  } else {
    operator = equalBtn.value === 'error'
      ? operator = ''
      : operatorTarget;
    display.textContent += operator;
  }

  if (display.textContent.includes('*') || display.textContent.includes('/')) {
    display.textContent = display.textContent.replace('*', MULTIPLY_SIGN);
    display.textContent = display.textContent.replace('/', DIVIDE_SIGN);
  }

  display.classList.remove('error');
  display.classList.remove('result');
}

function getResult() {
  if (!equalBtn.value) {
    let result;
    expressionDis.textContent = display.textContent;

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
        : numberA * 1;
      equalBtn.value = 'display';
      display.textContent = result;
      operator = '';
    }

    if (result === 'error') {
      display.classList.add('error');
    } else {
      display.classList.add('result');
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
  return operateResult = operateResult === 'error'
    ? operateResult
    : Number.isInteger(operateResult)
      ? operateResult
      : operateResult.toFixed(2);
}

function clearAll() {
  numberA = '';
  numberB = '';
  operator = '';
  display.textContent = '0';
  expressionDis.textContent = '';
  equalBtn.value = '';

  display.classList.remove('error');
  display.classList.remove('result');
}

function setFloat() {
  const float = '.';
  const currentDisplay = display.textContent;

  if (equalBtn.value) {
    numberA = 0 + float;
    display.textContent = numberA;
    equalBtn.value = '';
  } else {
    if (operator) {
      display.textContent = String(numberB).includes('.')
        ? currentDisplay
        : currentDisplay + float;
      numberB = String(numberB).includes('.')
        ? numberB
        : numberB + float;
    } else {
      display.textContent = String(numberA).includes('.')
        ? currentDisplay
        : currentDisplay + float;
      numberA = String(numberA).includes('.')
        ? numberA
        : numberA == 0
          ? 0 + float
          : numberA + float;
    }
  }
}

function getPercent() {
  if (!equalBtn.value) {
    if (operator) {
      if (numberB != 0) {
        switch (operator) {
          case '+':
          case '-':
            numberB /= 100;
            numberB *= numberA;
            display.textContent = `${numberA}${operator}${numberB}`;
            getResult();
            break;
          case '*':
          case '/':
            numberB /= 100;
            display.textContent = `${numberA}${operator}${numberB}`;
            getResult();
            break;
        }
      }
    } else {
      equalBtn.value = '';
      numberA /= 100;
      display.textContent = numberA;
    }
  }
}

function setDelete() {
  if (!equalBtn.value) {
    expressionDis.textContent = '';

    if (operator) {
      if (numberB) {
        numberB = numberB.slice(0, -1);
      } else {
        operator = '';
      }
      display.textContent = display.textContent.slice(0, -1);
    } else {
      numberA = String(numberA);
      numberA = numberA.length > 1
        ? numberA.slice(0, -1)
        : 0;
      display.textContent = numberA;
    }
  }
}

function setTheme() {
  const calculator = document.querySelector('.main_container');
  const theme = this.value;
  let filterDeg = 0;
  let filterEffect;

  switch (theme) {
    case '':
      filterDeg = 90;
      this.value = '1';
      break;
    case '1':
      filterDeg = 180;
      this.value = '2';
      break;
    case '2':
      filterDeg = 270;
      this.value = '3';
      break;
    case '3':
      filterDeg = 0;
      this.value = '';
  }

  filterEffect = `hue-rotate(${filterDeg}deg)`;
  calculator.style.filter = filterEffect;
}