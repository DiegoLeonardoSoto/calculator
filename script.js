const display = document.querySelector('#display')
let operation = []
let i = -1

let operatorsFunctions = {
  '+': function (x, y) {
    return x + y
  },
  '-': function (x, y) {
    return x - y
  },
  '*': function (x, y) {
    return x * y
  },
  '/': function (x, y) {
    return x / y
  }
}

function addNumber(e) {
  console.log(i)
  if (isNaN(operation[i])) {
    operation.push(this.innerText)
    ++i
  } else {
    operation[i] = operation[i] + this.innerText
  }

  display.innerHTML += this.innerText
  console.log(operation)
}

function addOperator(e) {
  ++i
  operation.push(this.innerText)
  display.innerHTML += ' ' + this.innerText + ' '
  console.log(operation)
}

function operate(e) {
  let i = 1

  display.innerHTML = operatorsFunctions[operation[i]](
    +operation[i - 1],
    +operation[i + 1]
  )
}

function clear(e) {
  operation = []
  display.innerHTML = ''
}

function undo(e) {
  operation.pop()
  let currentDisplay = display.innerHTML

  if (currentDisplay.length > 0)
    display.innerHTML =
      currentDisplay[currentDisplay.length - 1] === ' '
        ? currentDisplay.slice(0, currentDisplay.length - 3)
        : currentDisplay.slice(0, currentDisplay.length - 1)
}

const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('#clear')
const arrowBtn = document.querySelector('#arrow')
const equalBtn = document.querySelector('#equal')

numbers.forEach((number) => number.addEventListener('click', addNumber))
operators.forEach((operator) => operator.addEventListener('click', addOperator))

clearBtn.addEventListener('click', clear)
arrowBtn.addEventListener('click', undo)
equalBtn.addEventListener('click', operate)
