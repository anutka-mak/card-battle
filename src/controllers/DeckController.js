import CardModel from "../models/CardModel.js";

class DeckController {
    constructor() {
        this.deck = [];
    }

    initializeDeck() {
        const suits = [
            { name: 'Hearts', imageUrl: "assets/images/hearts.png" },
            { name: 'Diamonds', imageUrl: "/assets/images/diamonds.png" },
            { name: 'Clubs', imageUrl: "/assets/images/clubs.png" },
            { name: 'Spades', imageUrl: "/assets/images/spades.png" }
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

        this.deck = [];

        suits.forEach(suit => {
            ranks.forEach(rank => {
                const card = new CardModel(suit, rank);
                this.deck.push(card);
            });
        });
    }

    shuffle() {
        this.deck.sort(() => Math.random() - 0.5);
    }

    drawCards(number) {
        return this.deck.splice(0, number);
    }

    getCardsCount() {
        return this.deck.length;
    }
}

export default DeckController;
