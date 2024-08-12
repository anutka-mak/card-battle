import DeckController from "./controllers/deck-controller.js";
import CardController from "./controllers/card-controller.js";

DeckController.initializeDeck();
DeckController.shuffle(); //варіант вкласти в ініціалізацію

const player1Cards = DeckController.drawCards(6);
const player2Cards = DeckController.drawCards(6);

const player1Element = document.querySelector('.player-1-cards');
const player2Element = document.querySelector('.player-2-cards');

player1Cards.forEach((cardModel) => {
    CardController.renderCard(cardModel, player1Element);
});

player2Cards.forEach((cardModel) => {
    CardController.renderCard(cardModel, player2Element);
});
