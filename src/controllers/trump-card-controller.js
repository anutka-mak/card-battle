import TrumpCardModel from "../models/trump-card-model.js";
import TrumpCardView from "../views/trump-card-view.js";

class TrumpCardController {
    static trumpCard = null;

    static initializeTrumpCard(suits) {
        const randomIndex = Math.floor(Math.random() * suits.length);
        this.trumpCard = new TrumpCardModel(suits[randomIndex]);
        TrumpCardView.renderTrumpCard(this.trumpCard);
    }

    static getTrumpCard() {
        return this.trumpCard.getSuit().name;
    }

    static canTrumpBeat(attackerCard, defenderCard) {
        const attackerSuit = attackerCard.getSuit().name;
        const defenderSuit = defenderCard.getSuit().name;

        const attackerValue = attackerCard.getRank().value;
        const defenderValue = defenderCard.getRank().value;

        const trumpSuit = this.getTrumpCard();

        const attackerIsTrump = attackerSuit === trumpSuit;
        const defenderIsTrump = defenderSuit === trumpSuit;

        if (attackerIsTrump && !defenderIsTrump) {
            return true;
        } else if (attackerIsTrump && defenderIsTrump) {
            return attackerValue > defenderValue;
        }

        return false;
    }
}

export default TrumpCardController;
