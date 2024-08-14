import PlayerController from "./player-controller.js";
import FieldView from "../views/filed-view.js";

class FieldController {
    static fieldCards = [];
    static discardPile = [];

    static addCard(card) {
        const isSameValueCard = this.isSameValueOnField(card);

        if (!isSameValueCard) {
            this.fieldCards.push(card);
            FieldView.renderCard(card);
        }
    }

    static isSameValueOnField(card) {
        return this.fieldCards.some(
            fieldCard => fieldCard.getRank().value === card.getRank().value
        );
    }

    static handleFieldClick(player) {
        FieldView.onFieldClick(() => {
            const card = player.getSelectedCard();
            PlayerController.moveCardToField(player, card);
        });
    }

    static moveCardsToDiscard() {
        this.discardPile.push(...this.fieldCards);
        this.fieldCards = [];
        FieldView.clearField();
    }
}

export default FieldController;
