'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

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


///////////////////////////////////////////////
// button scrolling 
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

// page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // get relative path
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// page navigation using event delegation

// 1. add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // console.log(e.target);
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {

    const id = e.target.getAttribute('href'); // get relative path
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// adding event handlers for tabs
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // Guard clause
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // remove active class
  tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  // activate tab
  clicked.classList.add('operations__tab--active');

  // active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// menue fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;

  }
};
// passing an "argument" into handler 
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));


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
// document.documentElement.style.setProperty('--color-primary', 'orangered');

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


// events

// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('addEventListener: Great! you are reading the heading ;D');

//   h1.removeEventListener('mouseenter', alertH1); // can  write any where
// };

// h1.removeEventListener('mouseenter', alertH1); // can  write any where

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1);
// }, 5000);

// h1.onmouseenter = function (e) {
//     alert('addEventListener: Great! you are reading the heading ;D');
//   } // old school

// rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `
//     rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
//   console.log(e.currentTarget === this); // true

//   //stop propagation
//   //   e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('Nav', e.target, e.currentTarget);
//   },
//   false // for listening while capturing : top down propagation of event
// );

// DOM Traversing 

const h1 = document.querySelector('h1');

// // downwards : child ////////////////////////////////////
// console.log(h1.querySelectorAll('.highlight')); // node list
// // console.log(h1.childNodes); // not mostly used (nodeList)
// console.log(h1.children); // html collection for only direct children

// h1.firstElementChild.style.color = 'white';

// console.log(h1.parentNode);
// console.log(h1.parentElement); // same int his case as node

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// closest finds parents

// h1.closest('h1').style.background = 'var(--gradient-primary)'; // selects itself

/// going side ways  ///////////////////////////////////////

// in js we can access only direct siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)'
// })




