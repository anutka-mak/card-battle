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

    removeCard(card) {
        this.cards = this.cards.filter(c => c !== card);
    }

    getCards() {
        return this.cards;
    }

    getCardById(id) {
        return this.cards.find(card => card.id === id);
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getMode() {
        return this.mode;
    }

    setMode(mode) {
        this.mode = mode;
    }

    setSelectedCard(card) {
        this.selectedCard = card;
    }

    getSelectedCard() {
        return this.selectedCard;
    }
}

export default PlayerModel;
