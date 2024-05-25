"use strict";

let currentSet = 0;
let data = [];


fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData.slice(0, 12).map(product => {
      return {
        img: product.image,
        name: product.title,
        price: product.price.toFixed(2) 
      };
    });

    updateCards(0);
  })
  .catch(error => console.error('Error fetching data:', error));




function updateCards(setIndex) {
  const startIndex = setIndex * 3;
  const currentData = data.slice(startIndex, startIndex + 3);

  currentData.forEach((item, index) => {
    let card = document.querySelector(`.cards:nth-child(${index + 1})`);
    if (card) {
    
      let img = card.querySelector('img');
      let name = card.querySelector('.names');
      let price = card.querySelector('.prices');
      
      img.src = item.img;
      name.innerText = item.name;
      price.innerText = `$${item.price}`;
    }
  });

  document.querySelectorAll('.buttons').forEach((btn, index) => {
    if (index === setIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  currentSet = setIndex;
  updateShiftButtons();
}

// function for left and right shift buttons
function updateShiftButtons() {
    if (currentSet === 0) {
      leftshift.classList.add('disabled');
      leftshift.style.pointerEvents = 'none';
    } else {
      leftshift.classList.remove('disabled');
      leftshift.style.pointerEvents = 'auto';
    }
  
    if (currentSet === Math.ceil(data.length / 3) - 1) { 
      rightshift.classList.add('disabled');
      rightshift.style.pointerEvents = 'none';
    } else {
      rightshift.classList.remove('disabled');
      rightshift.style.pointerEvents = 'auto';
    }
  }
 // DOM Element creation 
let container = document.createElement('div');
container.className = 'container';

let navbar = document.createElement('div');
navbar.className = 'navbar';
let navheading = document.createElement('h1')
navheading.className='navheading'
navheading.textContent = 'Pagination';
navbar.append(navheading)


let cardholder = document.createElement('div');
cardholder.className = 'cardholder';

// Function to create cards inside cardholder div
function createCard() {
  let card = document.createElement('div');
  card.className = 'cards';
  
  let imgdiv = document.createElement('div')
  imgdiv.className = 'imgdiv'
  let img = document.createElement('img');
  
  let name = document.createElement('h2');
  name.className = 'names';
  
  let price = document.createElement('h3');
  price.className = 'prices';
  imgdiv.append(img)
  card.append(imgdiv, name, price);
  return card;
}

let card1 = createCard();
let card2 = createCard();
let card3 = createCard();

let btnholder = document.createElement('div');
btnholder.className = 'btnholder';

let leftshift = document.createElement('i');
leftshift.innerHTML = '<i class="fa-solid fa-caret-left" style="color: #191b1f;"></i><i class="fa-solid fa-caret-left" style="color: #191b1f;"></i>';
leftshift.className = 'arrowbtn';

//function for creating buttons
let buttons = [];
for (let i = 1; i <= 4; i++) {
  let btn = document.createElement('button');
  btn.innerText = i;
  btn.className = 'buttons';
  if (i === 1) btn.classList.add('active'); 
  buttons.push(btn);
}

let rightshift = document.createElement('i');
rightshift.innerHTML = '<i class="fa-solid fa-caret-right" style="color: #191b1f;"></i><i class="fa-solid fa-caret-right" style="color: #191b1f;"></i>';
rightshift.className = 'arrowbtn';

document.body.append(container);
container.append(navbar, cardholder);
cardholder.append(card1, card2, card3, btnholder);
btnholder.append(leftshift, ...buttons, rightshift);


buttons.forEach((button, index) => {
  button.addEventListener('click', () => updateCards(index));
});


leftshift.addEventListener('click', () => {
  if (!leftshift.classList.contains('disabled')) {
    let newIndex = currentSet - 1;
    updateCards(newIndex);
  }
});

rightshift.addEventListener('click', () => {
    if (currentSet < Math.floor(data.length / 3) - 1) {
      let newIndex = currentSet + 1;
      updateCards(newIndex);
    }
  });



  
  