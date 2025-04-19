import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function () {
  //write your code here
  //esto me hace referencia con lo que tengo en HTML
  const drawBtn = document.getElementById("draw"); //boton de draw
  const sortBtn = document.getElementById("sort"); //boton de sort
  const cardContainer = document.querySelector(".deck")//aqui va las cartas
  const inputCount = document.getElementById("cardCount")

  //aqui le damos valores a las cartas con numeros y simbolos
  const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const cardSuits = ["♦", "♥", "♠", "♣"];

  //guarda la carta, variables globales
  let cards = [];
  let deck = [];
  let log = [];

  //FORMULA para que se mueva aleatoriamente las cartas
  const getRandomCard = () => {
    const valueIndex = Math.floor(Math.random() * cardValues.length);
    const suitIndex = Math.floor(Math.random() * cardSuits.length);
    return {
      value: cardValues[valueIndex],
      suit: cardSuits[suitIndex],
      num: valueIndex + 1 //esto es para que me ayude a compar con el sort
    };
  };

  //esto me ayuda a crear cartas en HTML desde JS
  const createCardHTML = (card) => {
    const cardDiv = document.createElement("div");
    //aqui cambio el color de las cartas a rojo "♥" y "♦"
    const isRed = card.suit === "♥" || card.suit === "♦";
    cardDiv.className = isRed ? "card red" : "card";
    cardDiv.innerHTML = `
    <span class="top">${card.suit}</span>  
    <span class="middle">${card.value}</span>
    <span class="bottom">${card.suit}</span> 
  `;
    return cardDiv;
  };

  //FORMULA(algoritmo) de BubbleSort 
  function bubbleSort(arr = []) {
    const len = arr.length;
    const sorted = [...arr]; //esto crea una copia del array
    log = []; //esto es para reiniciar las cartas antes de empezar

    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1; j++) {
        if (sorted[j].num > sorted[j + 1].num) { //aqui voy a comparar el valor de las todas las cartas

          const temp = sorted[j]; // esto es para intercambiar el numero si es mayor
          sorted[j] = sorted[j + 1];
          sorted[j + 1] = temp;

          log.push([...sorted]);//me guarda el estado actual 
        }
      }
    }
    return sorted;
  }

  //funcion para el boton draw
  drawBtn.addEventListener("click", () => {
    const count = parseInt(inputCount.value);
    deck = [];
    log = [];
    cardContainer.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const card = getRandomCard();
      deck.push(card);
      cardContainer.appendChild(createCardHTML(card));
    }
    document.querySelector(".solution-log").innerHTML = "";
  });

  //para el boton sort
  sortBtn.addEventListener("click", () => {
    const sortedDeck = bubbleSort(deck);

    const logList = document.querySelector(".solution-log");
    logList.innerHTML = log.map((step, index) => {
      const stepHTML = step.map(card => createCardHTML(card).outerHTML).join("");
      return `<li><i>${index}</i><div class="deck">${stepHTML}</div></li>`;
    })
      .join("");
  });

};
