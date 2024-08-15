class CardModel {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.id = null;
        this.onCardClick = null;
    }

    getSuit() {
        return this.suit;
    }

    getRank() {
        return this.rank;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    setHandleClick(callback) {
        this.onCardClick = callback;
    }

    getHandleClick() {
        return this.onCardClick;
    }
}

export default CardModel;
