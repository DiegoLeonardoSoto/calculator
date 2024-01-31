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

function addNumber(e) {
  if (isNaN(display.innerHTML[0])) {
    clear()
  }

  if (placeHolder.innerText.length > 0) placeHolder.innerText = ''

  if (isNaN(operation[i])) {
    operation.push(+this.innerText)
    ++i
  } else {
    operation[i] = operation[i] + this.innerText
    operation[i] = +operation[i]
  }

  display.innerHTML += this.innerText
  console.log(operation)
}

function addOperator(e) {
  ++i

  if (i === 3) {
    operate(this.innerText)
  }

  operation.push(this.innerText)
  display.innerHTML += ' ' + this.innerText + ' '
  console.log(operation)
}

function operate(from) {
  console.log(from)
  let result
  try {
    const firstNum = operation.shift(),
      operator = operation.shift(),
      secondNum = operation.shift()

    if (isNaN(firstNum) || isNaN(secondNum)) throw new Error()

    /* i = 0 */
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
    clear()
    placeHolder.innerText = result
  } else {
    i = 1
    display.innerText = result
  }
}

function clear(e) {
  operation = []
  i = -1
  display.innerText = ''
  placeHolder.innerText = 0
}

function undo(e) {
  let currentDisplay = display.innerHTML

  if (currentDisplay.length < 0) return ''

  if (currentDisplay[currentDisplay.length - 1] === ' ') {
    display.innerHTML = currentDisplay.slice(0, currentDisplay.length - 3)
    operation.pop()
    --i
  } else {
    let lastNum = operation[i].toString()
    if (lastNum.length > 1) {
      lastNum = lastNum.slice(0, lastNum.length - 1)
      operation[i] = +lastNum
    } else {
      operation.pop()
      --i
    }

    display.innerHTML = currentDisplay.slice(0, currentDisplay.length - 1)
  }
}

function changeSign(e) {
  if (i >= 0 && !isNaN(operation[i])) {
    operation[i] = operation[i] * -1
    display.innerText = operation.join(' ')
  }

  console.log(operation)
}

const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('#clear')
const arrowBtn = document.querySelector('#arrow')
const equalBtn = document.querySelector('#equal')
const changeSignBtn = document.querySelector('#changeSign')

numbers.forEach((number) => number.addEventListener('click', addNumber))
operators.forEach((operator) => operator.addEventListener('click', addOperator))

clearBtn.addEventListener('click', clear)
arrowBtn.addEventListener('click', undo)
changeSignBtn.addEventListener('click', changeSign)
equalBtn.addEventListener('click', (e) => operate('='))
