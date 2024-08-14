class CardModel {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.id = null;
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
}

export default CardModel;
