'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


///// user names /////

const createUsernames = function (accs) {

  accs.forEach(function(acc) {
      acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  })
};

createUsernames(accounts);

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
            <div class="movements__date"></div>
            <div class="movements__value">${mov}</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};



const calcDisplaySummary = function (acc) {
  const income = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}£`;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc - mov, 0);
  labelSumOut.textContent = `${out}£`

  const interest = acc.movements.filter(mov => mov > 0).map(deposit => deposit * acc.interestRate / 100).filter((int, i, arr) => int >= 1).reduce((acc, int) => acc + int)

  labelSumInterest.textContent = `${interest}£`
}



// balance 
const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${balance} EUR`;
}



// console.log(containerMovements.innerHTML);



// EVENT handlers ////////////////////////////////
let currentAccount;
// LOGIN //////////////////////////////
btnLogin.addEventListener('click', function(e) {
  e.preventDefault(); 

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
// check if pin is valid
  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('Login');
    // Display UI and welcome msg
    labelWelcome.textContent = `Weclome back, ${currentAccount.owner.split(' ')[0]}`;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    // loose focus
    inputLoginPin.blur();

    containerApp.style.opacity = 100;
    // Display movements
    displayMovements(currentAccount.movements);
    //Display balance 
    calcDisplayBalance(currentAccount.movements);
    // Dkisplay summary
    calcDisplaySummary(currentAccount);
  }

  console.log(currentAccount);
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const eurToUsd = 1.1;

// const movementsUSD = movements.map(function(mov) {
// return mov * eurToUsd;
// })

const movementsUSD = movements.map(mov => mov * eurToUsd);

// console.log(movementsUSD);

const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

console.log(accounts);
