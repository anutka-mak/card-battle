import DeckView from "../views/deck-view.js";
import CardController from "./card-controller.js";
import TrumpCardController from "./trump-card-controller.js";

class DeckController {
    static cards = [];
    static suits = [
        { name: 'Hearts', imageUrl: "assets/images/hearts.png" },
        { name: 'Diamonds', imageUrl: "assets/images/diamonds.png" },
        { name: 'Clubs', imageUrl: "assets/images/clubs.png" },
        { name: 'Spades', imageUrl: "assets/images/spades.png" }
    ];

    static initializeDeck() {
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

        this.cards = [];

        this.suits.forEach(suit => {
            ranks.forEach(rank => {
                const card = CardController.createCard(suit, rank);
                this.cards.push(card);
            });
        });

        TrumpCardController.initializeTrumpCard(this.suits);
    }

    static drawCards(number) {
        const dealCards = this.cards.splice(0, number);
        this.renderCardCount();

        return dealCards;
    }

    static shuffle() {
        this.cards.sort(() => Math.random() - 0.5);
    }

    static getCardsCount() {
        return this.cards.length;
    }

    static renderCardCount() {
        const cardCount = DeckController.getCardsCount();
        DeckView.render(cardCount);
    }
}

export default DeckController;
