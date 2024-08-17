import PairCardModel from "../models/pair-card-model.js";

class PairCardController {
    static createPair() {
        return new PairCardModel();
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

export default PairCardController;
