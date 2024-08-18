import CardModel from "../models/card-model.js";
import PlayerController from "./player-controller.js";

class CardController {
    static createCard(suit, rank) {
        return new CardModel(suit, rank);
    }

    static canBeat(tossupCard, fightCard) {
        const tossupSuit = tossupCard.getSuit().name;
        const tossupValue = tossupCard.getRank().value;

        const fightSuit = fightCard.getSuit().name;
        const fightValue = fightCard.getRank().value;

        const isSameSuit = tossupSuit === fightSuit;

        return isSameSuit ? tossupValue > fightValue : false;
    }

    static handleCardClick(player, card) {
        card.setHandleClick(() => {
            PlayerController.selectCard(player, card);
        });
    }
}

export default CardController;
