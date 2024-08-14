import PlayerController from "./player-controller.js";
import FieldView from "../views/filed-view.js";

class FieldController {
    static fieldCards = [];
    static discardPile = [];

    static addCard(card) {
        this.fieldCards.push(card);
        FieldView.renderCard(card);
    }

    static handleFieldClick(player) {
        FieldView.onFieldClick(player, PlayerController.moveCardToField);
    }

    static checkForMatchingCard(value) {
        return this.fieldCards.some(card => card.value === value);
    }

    static checkForUnbeatenCard() {

    }

    static areAllCardsBeaten() {
    }

    static moveCardsToDiscard() {
        this.discardPile.push(...this.fieldCards);
        this.fieldCards = [];
        FieldView.clearField();
    }
}

export default FieldController;
