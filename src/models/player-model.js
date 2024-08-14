class PlayerModel {
    constructor(name, mode) {
        this.name = name;
        this.mode = mode;
        this.cards = [];
        this.selectedCard = null;
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

    addCard(card) {
        this.cards.push(card);
    }

    getSelectedCard() {
        return this.selectedCard;
    }

    selectCard(card) {
        if (this.selectedCard !== card) {
            this.selectedCard = card;
        }
    }

    clearSelectedCard() {
        this.selectedCard = null;
    }

    removeCard(card) {
        this.cards = this.cards.filter(c => c.id !== card.id);
        if (this.selectedCard && this.selectedCard.id === card.id) {
            this.clearSelectedCard();
        }
    }

    getCardById(cardId) {
        return this.cards.find(card => card.id === cardId);
    }
}

export default PlayerModel;
