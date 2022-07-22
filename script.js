'use strict';

function calculator() {
  const previousOperand = document.querySelector('.previous-operand');
  const currentOperand = document.querySelector('.current-operand');
  const numberButtons = document.querySelectorAll('.number-btn');
  const operationButtons = document.querySelectorAll('.operation-btn');
  const allClearButton = document.querySelector('.all-clear-btn');
  const deleteButton = document.querySelector('.delete-btn');
  const equalButton = document.querySelector('.equal-btn');

  window.addEventListener('keydown', handleKeyPress);

  let displayValue = '0';
  let currentNumber = '';
  let previousNumber = '';
  let operator = '';

  // ---- HANDLE ALL NUMBER/OPERATIONS BUTTONS ----
  equalButton.addEventListener('click', () => {
    if (currentNumber != '' && previousNumber != '') {
      compute();
    }
  });
  numberButtons.forEach(button => {
    button.addEventListener('click', e => {
      handleNumbers(e.target.textContent);
    });
  });
  operationButtons.forEach(opButton => {
    opButton.addEventListener('click', e => {
      handleOperators(e.target.textContent);
    });
  });
  deleteButton.addEventListener('click', e => {
    deleteOneNumber(e.target.textContent);
  });
  allClearButton.addEventListener('click', e => {
    allClear(e.target.textContent);
  });
  function handleNumbers(number) {
    if (previousNumber !== '' && currentNumber !== '' && operator === '') {
      previousNumber = '';
      currentOperand.textContent = currentNumber;
    }
    if (number === '.' && currentOperand.textContent.includes('.')) return;
    if (currentNumber.length <= 11) {
      currentNumber += number;
      currentOperand.textContent = currentNumber;
    }
    if (
      displayValue === currentOperand.textContent ||
      displayValue === previousOperand.textContent
    ) {
      currentNumber = '0';
      currentNumber += '.';
      currentOperand.textContent = currentNumber;
    } else if (!currentNumber.includes('.')) {
      displayValue += '.';
    }
  }
  function handleOperators(operant) {
    if (previousNumber === '') {
      previousNumber = currentNumber;
      operatorCheck(operant);
    } else if (currentNumber === '') {
      operatorCheck(operant);
    } else {
      compute();
      operator = operant;
      currentOperand.textContent = '0';
      previousOperand.textContent = previousNumber + ' ' + operator;
    }
  }
  function operatorCheck(text) {
    if (
      currentOperand.textContent === '0' &&
      previousOperand.textContent === ''
    ) {
      operator = '';
    } else {
      operator = text;
      previousOperand.textContent = previousNumber + ' ' + operator;
      currentOperand.textContent = '0';
      currentNumber = '';
    }
  }

  // ---- COMPUTATION FUNCTION ----
  function compute() {
    previousNumber = Number(previousNumber);
    currentNumber = Number(currentNumber);
    if (operator === '+') {
      previousNumber = previousNumber + currentNumber;
    } else if (operator === '-') {
      previousNumber = previousNumber - currentNumber;
    } else if (operator === '*') {
      previousNumber = previousNumber * currentNumber;
    } else if (operator === '÷') {
      if (previousNumber <= 0) {
        previousOperand.textContent = 'You can not devide by 0';
        displayResults();
        return;
      }
      previousNumber = previousNumber / currentNumber;
    }
    previousNumber = roundNumber(previousNumber);
    previousNumber = previousNumber.toString();
    displayResults();
  }

  // ---- FUNCTION TO ROUND/SLICE NUMBERS TO NOT OVERLOAD THE SCREEN ----
  function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
  }
  function displayResults() {
    if (previousNumber.length <= 11) {
      currentOperand.textContent = previousNumber;
    } else {
      currentOperand.textContent = previousNumber.slice(0, 11) + '...';
    }
    previousOperand.textContent = '';
    operator = '';
    currentNumber = '';
  }

  // ---- ALLCLEAR AND DELETE ONE NUMBER FFUNCTIONS
  function allClear() {
    previousNumber = '';
    previousOperand.textContent = '';
    currentNumber = '';
    currentOperand.textContent = '0';
    displayValue = '0';
  }
  function deleteOneNumber() {
    currentNumber = currentNumber.slice(0, -1);
    currentOperand.textContent = currentNumber;
    if (currentOperand.textContent === '') {
      currentOperand.textContent = '0';
    }
    if (currentNumber === '' && previousNumber !== '' && operator === '') {
      previousNumber = previousNumber.slice(0, -1);
      currentOperand.textContent = previousNumber;
    }
  }

  // ---- FUNCTION TO ENTER CHARACTERS BY PRESSING KEYS ON THE KEYBOARD ----
  function handleKeyPress(e) {
    if (e.key >= 0 && e.key <= 9) {
      handleNumbers(e.key);
    }
    if (
      e.key === 'Enter' ||
      (e.key === '=' && currentNumber != '' && previousNumber != '')
    ) {
      compute();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*') {
      handleOperators(e.key);
    }
    if (e.key === '/') {
      handleOperators('÷');
    }
    if (e.key === '.') {
      handleNumbers(e.key);
    }
    if (e.key === 'Backspace') {
      deleteOneNumber();
    }
    if (e.key === 'Escape') {
      allClear();
    }
  }
  deleteOneNumber();
  allClear();
  handleKeyPress();
}

calculator();
