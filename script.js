const display = document.querySelector('#display')

function addNumber(e) {
  display.innerHTML += this.innerText
}

function addOperator(e) {
  display.innerHTML += ' ' + this.innerHTML + ' '
}

function clear(e) {
  display.innerHTML = ''
}

function undo(e) {
  let currentDisplay = display.innerHTML

  if (currentDisplay.length > 0)
    display.innerHTML = currentDisplay.slice(0, currentDisplay.length - 1)
}

const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('#clear')
const arrowBtn = document.querySelector('#arrow')

numbers.forEach((number) => number.addEventListener('click', addNumber))
operators.forEach((operator) => operator.addEventListener('click', addOperator))

clearBtn.addEventListener('click', clear)
arrowBtn.addEventListener('click', undo)
