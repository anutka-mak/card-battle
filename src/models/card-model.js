class CardModel {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.id = null;
        this.clickCallback = null;
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

    getHandleClick() {
        if (this.clickCallback) {
            this.clickCallback(this.id);
        }
    }
}

export default CardModel;
