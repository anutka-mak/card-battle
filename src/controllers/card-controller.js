import CardModel from "../models/card-model.js";
import CardView from "../views/card-view.js";

class CardController {
    static createCard(suit, rank) {
        return new CardModel(suit, rank);
    }

    // card винести порівняння
    static canBeat(card, targetCardModel) {
        const thisCardSuit = card.getSuit().name;
        const thisCardRank = card.getRank().value;

        const otherCardSuit = targetCardModel.getSuit().name;
        const otherCardRank = targetCardModel.getRank().value;

        if (thisCardSuit === otherCardSuit) {
            return thisCardRank > otherCardRank;
        } else {
            return false;
        }
    }

    static renderCard(card, container) {
        CardView.render(card, container);
    }
}

export default CardController;
