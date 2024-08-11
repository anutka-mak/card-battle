class CardModel {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    getSuit() {
        return this.suit;
    }

    setSuit(suit) {
        this.suit = suit;
    }

    getRank() {
        return this.rank;
    }

    setRank(rank) {
        this.rank = rank;
    }
}

export default CardModel;
