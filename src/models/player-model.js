class PlayerModel {
    constructor(name, mode) {
        this.name = name;
        this.mode = mode;
        this.cards = [];
        this.selectedCard = null;
    }

    addCard(card) {
        this.cards.push(card);
    }

    getName() {
        return this.name;
    }

    getMode() {
        return this.mode;
    }

    setMode(mode) {
        this.mode = mode;
    }

    getCards() {
        return this.cards;
    }

    getSelectedCard() {
        return this.selectedCard;
    }

    selectCard(card) {
        if (this.selectedCard !== card) {
            this.selectedCard = card;
        }
    }

    getCardById(cardId) {
        return this.cards.find(card => card.id === cardId);
    }

    removeCard(cardId) {
        this.cards = this.cards.filter(card => card.id !== cardId);
    }
}

export default PlayerModel;
