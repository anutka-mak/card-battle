class CardModel {
    constructor(suit, rank, id) {
        this.suit = suit;
        this.rank = rank;
        this.id = id;
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
}

export default CardModel;
