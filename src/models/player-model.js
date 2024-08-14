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

    setSelectedCard(card) {
        this.selectedCard = card;
    }

    getSelectedCard() {
        return this.selectedCard;
    }

    getCardById(cardId) {
        return this.cards.find(card => card.id === cardId);
    }

    removeCard(cardId) {
        this.cards = this.cards.filter(card => card.getId() !== cardId);
    }
}

export default PlayerModel;
