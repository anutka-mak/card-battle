class CardController {
    constructor(model) {
        this.model = model;
    }

    canBeat(card) {
        const thisCardSuit = this.model.getSuit().name;
        const thisCardRank = this.model.getRank().value;

        const otherCardSuit = card.getSuit().name;
        const otherCardRank = card.getRank().value;

        if (thisCardSuit === otherCardSuit) {
            return thisCardRank > otherCardRank;
        } else {
            return false;
        }
    }
}

export default  CardController;
