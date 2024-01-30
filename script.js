const display = document.querySelector('#display')

function getValue(e) {
  display.innerHTML += this.innerText
}

const numbers = document.querySelectorAll('.number')

numbers.forEach((number) => number.addEventListener('click', getValue))
