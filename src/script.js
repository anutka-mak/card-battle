import CardController from "./controllers/card-controller.js";
import CardView from "./views/card-view.js";
import DeckController from "./controllers/deck-controller.js";
import DeckView from "./views/deck-view.js";

const deckController = new DeckController();
const deckView = new DeckView(deckController);

deckController.initializeDeck();
deckController.shuffle();
deckView.render();

const dealtCards = deckController.drawCards(6);

dealtCards.forEach((cardModel, index) => {
    const cardView = new CardView(cardModel);

    cardView.render();

    if (index > 0) {
        const isWinningCard = new CardController(cardModel).canBeat(dealtCards[index - 1]);
        console.log(`Card ${index + 1} can beat Card ${index}: ${isWinningCard}`);
    }
});

deckView.render();
