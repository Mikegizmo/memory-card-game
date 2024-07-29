const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let quantityBtn = document.getElementById('quantityBtn');

let cardQuantity;

quantityBtn.addEventListener('click', () => {
  cardQuantity = document.getElementById('cardQuantity').value;
  console.log(cardQuantity);
  generateCards();
})

document.querySelector(".score").textContent = score;

// fetch("./data/cards.json")
//   .then((res) => res.json())
//   .then((data) => {
//     cards = [...data, ...data];
//     shuffleCards();
//     generateCards();
//   });

// function shuffleCards() {
//   let currentIndex = cards.length,
//     randomIndex,
//     temporaryValue;
//   console.log(currentIndex);
//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = cards[currentIndex];
//     cards[currentIndex] = cards[randomIndex];
//     cards[randomIndex] = temporaryValue;
//   }
// }

function generateCards() {
  for (let i= 0; i < cardQuantity; i++) {
    console.log(i);
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", i.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${i.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}