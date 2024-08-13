import DeckController from "./controllers/deck-controller.js";
import PlayerController from "./controllers/player-controller.js";

DeckController.initializeDeck();
DeckController.shuffle(); //варіант вкласти в ініціалізацію

const player1 = PlayerController.createPlayer('Player 1', 'attacker');
const player2 = PlayerController.createPlayer('Player 2', 'defender');

const player1Cards = DeckController.drawCards(6);
const player2Cards = DeckController.drawCards(6);

player1Cards.forEach(card => PlayerController.addCardToPlayer(player1, card));
player2Cards.forEach(card => PlayerController.addCardToPlayer(player2, card));

PlayerController.renderPlayerCards(player1);
PlayerController.renderPlayerCards(player2);

