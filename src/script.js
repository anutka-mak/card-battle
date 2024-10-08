import DeckController from "./controllers/deck-controller.js";
import PlayerController from "./controllers/player-controller.js";
import FieldController from "./controllers/field-controller.js";

DeckController.initializeDeck();
DeckController.shuffle();

const player1 = PlayerController.createPlayer('Player 1');
const player2 = PlayerController.createPlayer('Player 2');

const player1Cards = DeckController.drawCards(6);
const player2Cards = DeckController.drawCards(6);

PlayerController.takeCards(player1, player1Cards);
PlayerController.takeCards(player2, player2Cards);

PlayerController.renderPlayerCards(player1);
PlayerController.renderPlayerCards(player2);

FieldController.handlePlayerClick(player1);
FieldController.handlePlayerClick(player2);
