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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a,b)=> a - b) : movements;

  movs.forEach(function (mov, i) {
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
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
}



// console.log(containerMovements.innerHTML);

const updateUI = function(curAcc) {
   // Display movements
   displayMovements(curAcc.movements);
   //Display balance 
   calcDisplayBalance(curAcc);
   // Dkisplay summary
   calcDisplaySummary(curAcc);
}

// EVENT handlers ////////////////////////////////
let currentAccount;
// LOGIN //////////////////////////////
btnLogin.addEventListener('click', function(e) {
  e.preventDefault(); 

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  inputTransferAmount.value = inputTransferTo.value = '';
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
    updateUI(currentAccount);
  }
});


btnTransfer.addEventListener('click', function(e) {
e.preventDefault();

const amount = Number(inputTransferAmount.value);
const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

if(amount > 0 && receiverAcc && amount <= currentAccount.balance && receiverAcc?.username !== currentAccount.username) {

  currentAccount.movements.push(-amount);
  receiverAcc.movements.push(amount);
  
  updateUI(currentAccount);
} 
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount,movements.some(mov => mov > amount * 0.1)) {
    // add movement 
    currentAccount.movements.push(amount);

    // update ui
    updateUI(currentAccount);
  }
});


btnClose.addEventListener('click', function(e){
  e.preventDefault();


  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {

    const index = accounts.findIndex(acc => acc.username === currentAccount.username );
    // Delete account 
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

  }
  
  inputCloseUsername.value = inputClosePin.value = '';
});

//state variable to know sort or not
let sorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
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
// console.log(account);

// console.log(accounts);

// flat 

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

const overalBalance1 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance1);