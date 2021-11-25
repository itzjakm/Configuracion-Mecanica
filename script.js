const times = (n, callback) => {
  while (n) {
    callback();
    n--;
  }
};

class model {
  constructor(number, letter) {
    this.number = number;
    this.letter = letter;
    //spdf
    this.capacity =
      letter === 's'
        ? 2
        : letter === 'p'
        ? 6
        : letter === 'd'
        ? 10
        : letter === 'f'
        ? 14
        : console.log('Invalid letter');
    this.capacityPositive = this.capacity / 2;
    this.capacityNegative = this.capacity / 2;
    this.divided = this.capacity / 2;
    this.countPositive = 0;
    this.countNegative = 0;
  }
  get count() {
    return this.countPositive + this.countNegative;
  }
}
//electronic configuration

function showError(error) {
  console.log(error.message);
  document.querySelector('.text-result').textContent = error.message;
  return [];
}
function all(masterNum) {
  const arr = [
    new model(1, 's'),
    new model(2, 's'),
    new model(2, 'p'),
    new model(3, 's'),
    new model(3, 'p'),
    new model(4, 's'),
    new model(3, 'd'),
    new model(4, 'p'),
    new model(5, 's'),
    new model(4, 'd'),
    new model(5, 'p'),
    new model(6, 's'),
    new model(4, 'f'),
    new model(5, 'd'),
    new model(6, 'p'),
    new model(7, 's'),
    new model(5, 'f'),
    new model(6, 'd'),
    new model(7, 'p'),
    new model(8, 's'),
    new model(6, 'f'),
    new model(7, 'd'),
  ];
  if (masterNum < 0)
    return showError(new Error('El numero debe de ser positivo'));
  if (masterNum > 144)
    return showError(new Error('El numero debe de ser menor a 144'));
  const relevantArr = [];
  let numCounter = 0;
  for (let arrCounter = 0; numCounter < masterNum; arrCounter++) {
    numCounter += arr[arrCounter].capacity;
    relevantArr.push(arr[arrCounter]);
  }
  let deliverNum = masterNum;

  relevantArr.forEach(e => {
    times(e.capacityPositive, () => {
      if (deliverNum <= 0) return;
      e.countPositive++;
      deliverNum--;
    });
    times(e.capacityNegative, () => {
      if (deliverNum <= 0) return;
      e.countNegative++;
      deliverNum--;
    });
  });
  return relevantArr;
}
function createString(arr) {
  return arr
    .reduce((acc, e) => (acc += `-${e.number}${e.letter}${e.count}`), '')
    .slice(1);
}

document.querySelector('.start-form').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.querySelector('.start-input');
  const relevantArr = all(Number(input.value));
  if (!relevantArr.length) return;
  /*  document.querySelector('.text-result').textContent =
    createString(relevantArr); */
  document.querySelector('.text-result').innerHTML = createString(relevantArr)
    .split('-')
    .map(e => `${e[0]}${e[1]}<sup>${e[2]}</sup>`)
    .join('-');
  const blocksEl = document.querySelector('.blocks');
  blocksEl.innerHTML = '';
  relevantArr.forEach(e => {
    let counterPositive = e.countPositive;
    let counterNegative = e.countNegative;
    for (let i = 1; i <= e.divided; i++) {
      if (counterPositive <= 0 && counterNegative <= 0) continue;
      blocksEl.insertAdjacentHTML(
        'beforeend',
        `</div><div class="block"><p>${
          counterPositive > 0 ? '1' : ''
        }<span class="upside-down">${
          counterNegative > 0 ? '1' : ''
        }</span></p><hr><p>${e.number}${e.letter}${
          e.divided > 1 ? i : ''
        }</p></div>`
      );
      counterPositive--;
      counterNegative--;
    }
  });

  input.blur();
});

/* let consol = all(11);
consol = createString(consol);
console.log(consol); */
