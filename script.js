const display = document.querySelector('#displayText')
const placeHolder = document.querySelector('#placeHolder')

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

function addNumber(number) {
  if (isNaN(display.innerHTML[0]) && display.innerHTML[0] !== '-') {
    clear()
  }

  if (placeHolder.innerText.length > 0) placeHolder.innerText = ''

  if (isNaN(operation[i])) {
    number === '0.' ? operation.push(number) : operation.push(+number)
    ++i
  } else {
    operation[i] = operation[i] + number
    operation[i] = +operation[i]
  }

  display.innerHTML += number
}

function addOperator(e) {
  ++i
  if (decimalBtn.disabled === true) toggleDecimalBtn()
  if (i === 3) {
    operate(this.innerText)
  }

  operation.push(this.innerText)
  display.innerHTML += ' ' + this.innerText + ' '
}

function operate(from) {
  let result
  try {
    const firstNum = operation.shift(),
      operator = operation.shift(),
      secondNum = operation.shift()

    if (isNaN(firstNum) || isNaN(secondNum)) throw new Error()

    i = 1
    result = operatorsFunctions[operator](firstNum, secondNum)
    operation.push(result)
  } catch (error) {
    result = 'Syntax Error'
  } finally {
    renderResult(result, from)
  }
}

function renderResult(result, from) {
  if (from === '=') {
    toggleDecimalBtn()
    clear()
    placeHolder.innerText = result
  } else {
    display.innerText = result
  }
}

function clear(e) {
  operation = []
  i = -1
  display.innerText = ''
  placeHolder.innerText = 0
  if (decimalBtn.disabled === true) {
    toggleDecimalBtn()
  }
}

function undo(params) {
  if (display.innerText === '') return
  let currentDisplay = display.innerText
  const currentDisplayLength = currentDisplay.length
  let newDisplay = ''

  if (!isNaN(currentDisplay[currentDisplayLength - 1])) {
    newDisplay = currentDisplay.slice(0, currentDisplayLength - 1)

    let numToString = operation[i].toString()
    let newNum = numToString.slice(0, numToString.length - 1)

    if (newNum.length === 0) {
      operation.pop()
      i--
    } else {
      operation[i] = +newNum
    }
  }

  if (operatorsFunctions[currentDisplay[currentDisplayLength - 1]]) {
    newDisplay = currentDisplay.slice(0, currentDisplayLength - 2)

    operation.pop()
    i--
  }

  if (currentDisplay[currentDisplayLength - 1] === ' ') {
    newDisplay = currentDisplay.slice(0, currentDisplayLength - 3)

    operation.pop()
    i--
  }

  if (
    currentDisplay[currentDisplayLength - 2] === '.' &&
    currentDisplay[currentDisplayLength - 3] !== '0'
  ) {
    newDisplay = currentDisplay.slice(0, currentDisplayLength - 2)
    toggleDecimalBtn()
  }

  if (
    currentDisplay[currentDisplayLength - 3] === '0' &&
    currentDisplay[currentDisplayLength - 2] === '.' &&
    !isNaN(currentDisplay[currentDisplayLength - 1])
  ) {
    newDisplay = currentDisplay.slice(0, currentDisplayLength - 3)
    toggleDecimalBtn()

    operation.pop()
    i--
  }

  if (
    currentDisplay[currentDisplayLength - 2] === '0' &&
    currentDisplay[currentDisplayLength - 1] === '.'
  ) {
    newDisplay = currentDisplay.slice(0, currentDisplayLength - 2)
    toggleDecimalBtn()

    operation.pop()
    i--
  }
  display.innerText = newDisplay
}

function toggleDecimalBtn() {
  decimalBtn.disabled = !decimalBtn.disabled
}

function changeSign(e) {
  if (i >= 0 && !isNaN(operation[i])) {
    operation[i] = operation[i] * -1
    display.innerText = operation.join(' ')
  }
}

function addZero(e) {
  if (!isNaN(operation[i]) && operation[i].toString().length > 0) {
    addNumber(this.innerText)
  }
}

function addDecimal() {
  if (!operation[i] || isNaN(operation[i])) {
    addNumber('0.')
    toggleDecimalBtn()
  } else {
    operation[i] += '.'
    display.innerText += '.'
    toggleDecimalBtn()
  }
}

const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('#clear')
const arrowBtn = document.querySelector('#arrow')
const equalBtn = document.querySelector('#equal')
const changeSignBtn = document.querySelector('#changeSign')
const zeroBtn = document.querySelector('#zero')
const decimalBtn = document.querySelector('#decimal')

numbers.forEach((number) =>
  number.addEventListener('click', function () {
    addNumber(this.innerText)
  })
)
operators.forEach((operator) => operator.addEventListener('click', addOperator))

clearBtn.addEventListener('click', clear)
arrowBtn.addEventListener('click', undo)
changeSignBtn.addEventListener('click', changeSign)
equalBtn.addEventListener('click', (e) => operate('='))
zeroBtn.addEventListener('click', addZero)
decimalBtn.addEventListener('click', addDecimal)
