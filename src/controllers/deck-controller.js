import CardController from "./card-controller.js";
import DeckView from "../views/deck-view.js";

class DeckController {
    static deck = [];

    static initializeDeck() {
        const suits = [
            { name: 'Hearts', imageUrl: "assets/images/hearts.png" },
            { name: 'Diamonds', imageUrl: "assets/images/diamonds.png" },
            { name: 'Clubs', imageUrl: "assets/images/clubs.png" },
            { name: 'Spades', imageUrl: "assets/images/spades.png" }
        ];

        const ranks = [
            { name: '6', value: 6 },
            { name: '7', value: 7 },
            { name: '8', value: 8 },
            { name: '9', value: 9 },
            { name: '10', value: 10 },
            { name: 'Jack', value: 11 },
            { name: 'Queen', value: 12 },
            { name: 'King', value: 13 },
            { name: 'Ace', value: 14 }
        ];

        DeckController.deck = [];

        suits.forEach(suit => {
            ranks.forEach(rank => {
                const card = CardController.createCard(suit, rank);
                DeckController.deck.push(card);
            });
        });
    }

    static shuffle() {
        DeckController.deck.sort(() => Math.random() - 0.5);
    }

    static drawCards(number) {
        return DeckController.deck.splice(0, number);
    }

    static getCardsCount() {
        return DeckController.deck.length;
    }

    static renderCardCount() {
        const cardCount = DeckController.getCardsCount();
        DeckView.render(cardCount);
    }
}

export default DeckController;
