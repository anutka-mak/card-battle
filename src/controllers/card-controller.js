import CardModel from "../models/card-model.js";
import CardView from "../views/card-view.js";

class CardController {
    static count = 0;

    static createCard(suit, rank) {
        const id = `card-${++this.count}`;
        return new CardModel(suit, rank, id);
    }
    static canBeat(tossupCard, fightCard) {
        const tossupSuit = tossupCard.getSuit().name;
        const tossupValue = tossupCard.getRank().value;

        const fightSuit = fightCard.getSuit().name;
        const fightValue = fightCard.getRank().value;

        const isSameSuit = tossupSuit === fightSuit;

        return isSameSuit ? tossupValue > fightValue : false;
    }

    static renderCard(card, container) {
        CardView.render(card, container);
    }
}

export default CardController;
