import PairCardController from "./pair-card-controller.js";
import CardController from "./card-controller.js";
import PlayerController from "./player-controller.js";
import FieldView from "../views/field-view.js";

class FieldController {
    static fieldCard = [];
    static discardPile = [];

    static addCardToField(player, card, cardPair) {
        const mode = PlayerController.getPlayerMode(player);
        const attacker = 'attacker';

        if (mode === attacker) {
            this.addAttackerCard(card);
        } else {
            this.addDefenderCard(cardPair, card);
        }
    }

    static addAttackerCard(card) {
        const canTossCard = this.canTossCard(card);
        const isFieldEmpty = this.isFieldEmpty();

        if (canTossCard || isFieldEmpty) {
            const cardPair = PairCardController.createPair();
            PairCardController.addAttacker(cardPair, card);
            this.fieldCard.push(cardPair);
            this.renderField();
        } else {
            console.log("Cannot toss this card!");
        }
    }

    static addDefenderCard(pair, card) {
        if (this.canDefenderUseCard(pair, card)) {
            PairCardController.addDefender(pair, card);
            this.renderField();
        }
    }

    static isCanBeat(cardPair) {
        const attacker = cardPair.getAttacker();
        const defender = cardPair.getDefender();

        return CardController.canBeat(defender, attacker);
    }

    static canDefenderUseCard(pair, defenderCard) {
        return CardController.canBeat(defenderCard, pair.getAttacker());
    }

    static findIncompletePairs() {
        return this.fieldCard.filter(pair => !pair.isPairComplete());
    }

    static renderField() {
        FieldView.clearField();
        this.fieldCard.forEach(pair => FieldView.renderCardPair(pair));
    }

    static isFieldEmpty() {
        return this.fieldCard.length === 0;
    }

    static canAddCard(card, mode) {
        const attacker = 'attacker';
        const defender = 'defender';

        if (mode === attacker) {
            if (this.isFieldEmpty()) {
                return true;
            }

            return this.canTossCard(card);
        }

        if (mode === defender) {
            const incompletePairs = this.findIncompletePairs();

            return incompletePairs.some(pair => this.canDefenderUseCard(pair, card));
        }

        return false;
    }

    static canTossCard(card) {
        const rankValue = card.getRank().value;

        return this.fieldCard.some(pair => {
            const attackerRankValue = pair.getAttacker().getRank().value;
            const defenderRankValue = pair.getDefender()?.getRank().value;

            return attackerRankValue === rankValue || defenderRankValue === rankValue;
        });
    }

    static areAllCardsBeaten() {
        return this.fieldCard.every(pair => pair.isPairComplete());
    }

    static moveCardsToDiscard(pairs) {
        const areAllCardsBeaten = this.areAllCardsBeaten();

        if (areAllCardsBeaten) {
            pairs.forEach(pair => {
                const attackerCard = pair.getAttacker();
                const defenderCard = pair.getDefender()

                this.discardPile.push(attackerCard, defenderCard);
                this.removeCardPair(pair);
            });

            console.log(this.discardPile);
            this.renderField();
        }
    }

    static removeCardPair(cardPair) {
        this.fieldCard = this.fieldCard.filter(pair => pair !== cardPair);
    }

    static handleFieldClick(player) {
        FieldView.onFieldClick(() => {
            const card = player.getSelectedCard();
            PlayerController.moveCardToField(player, card);
        });
    }

    static handlePairClick(player) {
        FieldView.onPairCardClick((cardPair) => {
            const card = player.getSelectedCard();

            if (card) {
                PlayerController.moveCardToField(player, card, cardPair);
            } else {
                console.log("No card selected to move to the field.");
            }
        });
    }

    static handlePlayerClick(player) {
        const modePlayer = PlayerController.getPlayerMode(player);
        const attacker = 'attacker';

        if (modePlayer === attacker) {
            this.handleFieldClick(player);
        } else {
            this.handlePairClick(player);
        }
    }
}

export default FieldController;
