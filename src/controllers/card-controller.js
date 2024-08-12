import CardModel from "../models/card-model.js";
import CardView from "../views/card-view.js";

class CardController {
    static createCard(suit, rank) {
        return new CardModel(suit, rank);
    }

    static canBeat(cardModel, targetCardModel) {
        const thisCardSuit = cardModel.getSuit().name;
        const thisCardRank = cardModel.getRank().value;

        const otherCardSuit = targetCardModel.getSuit().name;
        const otherCardRank = targetCardModel.getRank().value;

        if (thisCardSuit === otherCardSuit) {
            return thisCardRank > otherCardRank;
        } else {
            return false;
        }
    }

    static renderCard(cardModel, container) {
        CardView.render(cardModel, container);
    }
}

export default CardController;
