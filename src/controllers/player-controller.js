import PlayerModel from "../models/player-model.js";
import PlayerView from "../views/player-view.js";
import CardController from "./card-controller.js";
import FieldController from "./field-controller.js";

class PlayerController {
    static players = [];

    static createPlayer(name, mode) {
        const player = new PlayerModel(name, mode);

        player.setMode(mode);
        this.players.push(player);

        return player;
    }

    static getPlayerMode(player) {
        return player.getMode();
    }

    static findPlayerByCardId(cardId) {
        return this.players.find(player => player.getCardById(cardId));
    }

    static addCardToPlayer(player, card) {
        player.addCard(card);
        this.renderPlayerCards(player);
    }

    static takeCards(player, cards) {
        cards.forEach(card => this.addCardToPlayer(player, card));
    }

    static selectCard(player, card) {
        player.setSelectedCard(card);
        PlayerView.selectCard(card);
    }

    static moveCardToField(player, card, cardPair) {
        const cardId = card.getId();
        const isSamePlayer = this.findPlayerByCardId(cardId) === player;

        if (isSamePlayer) {
            const mode = this.getPlayerMode(player);
            const canAddCard = FieldController.canAddCard(card, mode);

            if (canAddCard) {
                FieldController.addCardToField(player, card, cardPair);
                this.removeCardFromPlayer(player, card.getId());
            } else {
                console.log("This card cannot be added to the field.");
            }

            player.removeSelectedCard();
            this.renderPlayerCards(player);
        }
    }

    static removeCardFromPlayer(player, cardId) {
        player.removeCard(cardId);
    }

    static renderPlayerCards(player) {
        const playerCards = player.getCards();

        playerCards.forEach(card => {
            CardController.handleCardClick(player, card);
        });

        PlayerView.renderPlayer(player);
    }
}

export default PlayerController;
