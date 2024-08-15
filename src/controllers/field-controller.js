import CardPairController from "./card-pair-controller.js";
import CardController from "./card-controller.js";
import PlayerController from "./player-controller.js";
import FieldView from "../views/filed-view.js";

class FieldController {
    static fieldCard = [];
    static discardPile = [];

    static addCard(player, card) {
        const mode = PlayerController.getPlayerMode(player);
        const attacker = 'attacker';

        if (mode === attacker) {
            this.addAttackerCard(card);
        } else {
            this.addDefenderCard(card);
        }
    }

    static addAttackerCard(card) {
        const isDuplicateCard = this.isDuplicateCard(card);
        const canTossCard = this.canTossCard(card);

        if (!isDuplicateCard && canTossCard) {
            const cardPair = CardPairController.createPair();
            CardPairController.addAttacker(cardPair, card);
            this.fieldCard.push(cardPair);
            this.renderField();
        } else {
            console.log("Cannot toss this card!");
        }
    }

    static addDefenderCard(card) {
        const lastPair = this.getLastCardPair();
        const canUseCard = lastPair && this.canDefenderUseCard(lastPair, card);
        const isDuplicateCard = this.isDuplicateCard(card);

        if (canUseCard && !isDuplicateCard) {
            CardPairController.addDefender(lastPair, card);
            this.isCanBeat(lastPair);
            this.renderField();
        }
    }

    static isCanBeat(cardPair) {
        const attacker = cardPair.getAttacker();
        const defender = cardPair.getDefender();

        const result = CardController.canBeat(defender, attacker);

        if (result) {
            console.log("The card is beaten!");
        } else {
            console.log("The card is not beaten!");
        }

        return result;
    }

    static canDefenderUseCard(lastPair, defenderCard) {
        const attackerCard = lastPair.getAttacker();

        const isSameSuit = attackerCard.getSuit().name === defenderCard.getSuit().name;
        const isNotLessValue = defenderCard.getRank().value >= attackerCard.getRank().value;

        return isSameSuit && isNotLessValue;
    }

    static isDuplicateCard(card) {
        return !!this.fieldCard.find(pair => {
            const attackerCard = pair.getAttacker();
            const defenderCard = pair.getDefender();

            const isDuplicateAttacker =
                attackerCard.getRank().value === card.getRank().value &&
                attackerCard.getSuit().name === card.getSuit().name;

            const isDuplicateDefender = defenderCard &&
                defenderCard.getRank().value === card.getRank().value &&
                defenderCard.getSuit().name === card.getSuit().name;

            return isDuplicateAttacker || isDuplicateDefender;
        });
    }

    static getLastCardPair() {
        return this.fieldCard.at(-1);
    }

    static removeCardPair(cardPair) {
        this.fieldCard = this.fieldCard.filter(pair => pair !== cardPair);
    }

    static moveCardsToDiscard(pairs) {
        const allCardsBeaten = this.areAllCardsBeaten();

        if (allCardsBeaten) {
            pairs.forEach(pair => {
                const attackerCard = pair.getAttacker();
                const defenderCard = pair.getDefender();

                this.discardPile.push(attackerCard, defenderCard);
                this.removeCardPair(pair);
            });

            console.log(this.discardPile);
            this.renderField();
        }
    }

    static handleFieldClick(player) {
        FieldView.onFieldClick(() => {
            const card = player.getSelectedCard();
            PlayerController.moveCardToField(player, card);
        });
    }

    static renderField() {
        FieldView.clearField();
        this.fieldCard.forEach(pair => {
            const attackerCard = pair.getAttacker();
            const defenderCard = pair.getDefender();

            FieldView.renderCard(attackerCard, 'attacker');

            if (defenderCard) {
                FieldView.renderCard(defenderCard, 'defender');
            }
        });
    }

    static canAddCard(card, mode) {
        const lastPair = this.getLastCardPair();
        const isDuplicate = this.isDuplicateCard(card);
        const canToss = this.canTossCard(card);
        const attacker = 'attacker';
        const defender = 'defender';

        if (mode === attacker) {
            return !isDuplicate && canToss;
        }

        if (mode === defender) {
            return lastPair && this.canDefenderUseCard(lastPair, card) && !isDuplicate;
        }

        return false;
    }

    static canTossCard(card) {
        if (this.fieldCard.length === 0) {
            return true;
        }

        const rankValue = card.getRank().value;

        const matchingPair = this.fieldCard.find(pair => {
            const attackerRankValue = pair.getAttacker().getRank().value;
            const defenderRankValue = pair.getDefender() ? pair.getDefender().getRank().value : null;

            return attackerRankValue === rankValue || defenderRankValue === rankValue;
        });

        return !!matchingPair;
    }

    static areAllCardsBeaten() {
        return this.fieldCard.every(pair => pair.isPairComplete() && this.isCanBeat(pair));
    }
}

export default FieldController;
