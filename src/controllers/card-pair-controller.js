import CardPairModel from "../models/card-pair-model.js";

class CardPairController {
    static createPair() {
        return new CardPairModel();
    }

    static addAttacker(cardPair, card) {
        cardPair.setAttacker(card);
        return cardPair;
    }

    static addDefender(cardPair, card) {
        cardPair.setDefender(card);
        return cardPair;
    }
}

export default CardPairController;
