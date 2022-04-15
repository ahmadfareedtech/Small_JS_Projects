'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// adding event listener to btns
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////
//////////////////////////////////////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
// const allsections = document.querySelectorAll('.section'); // retunrs NodeList
// console.log(allsections);

// document.getElementById('section--1');
// const allButton = document.getElementsByTagName('button'); // retunrs HTML collection (live collection)

// console.log(document.getElementsByClassName('btn')); // returns HTML collection

// Creating and inserting elements ****************************
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies foor improved functionality and analytics';
message.innerHTML =
  'We use cookies foor improved functionality and analytics <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // both of these add element as child to header
header.append(message);

// header.before(message);
// header.after(message); // both of these add elment as sibling to header

// delete elemnt **********************************
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// styles **************************************
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(message.style.width); // works here not in tutorial
// console.log(message.style.backgroundColor); // works
// console.log(message.style.color); // nothing
// to get property seriously enogh
// console.log(getComputedStyle(message).color); // works
// 10 is base for decimal number system
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// change color of variables of css
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes *********************************

const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// to set attribute
// logo.alt = 'Beautiful logo';

// Non-standard property
// console.log(logo.designer); // undefined
// console.log(logo.getAttribute('designer')); // Ahmad

// to set custom attribute's value
// logo.setAttribute('company', 'Bankist'); // new property created
// console.log(logo.src); // absolute path
// console.log(logo.getAttribute('src')); // relative path img/logo.png

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href); // http://127.0.0.1:5500/Bankist_website/index.html#
// console.log(link.getAttribute('href')); // #

// data attributes
// console.log(logo.dataset.versionNumber);

// classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// don't use below code bcz it overrides all other classes
// logo.className = 'jonas';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  //   console.log(s1coords);

  //   console.log(e.target.getBoundingClientRect());

  //   console.log('Current scroll (x/y)', window.pageXOffset, pageYOffset);
  //   console.log(
  //     'height/width viewport',
  //     // dimentions of view port not including scroll bars
  //     document.documentElement.clientHeight,
  //     document.documentElement.clientWidth
  //   );

  // scrolling
  //   window.scrollTo(
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset
  //   );

  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// events

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! you are reading the heading ;D');

  //   h1.removeEventListener('mouseenter', alertH1); // can  write any where
};

// h1.removeEventListener('mouseenter', alertH1); // can  write any where

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 5000);

// h1.onmouseenter = function (e) {
//     alert('addEventListener: Great! you are reading the heading ;D');
//   } // old school

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `
    rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // true

  //stop propagation
  //   e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('Nav', e.target, e.currentTarget);
  },
  false // for listening while capturing : top down propagation of event
);
