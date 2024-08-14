import PlayerModel from "../models/player-model.js";
import PlayerView from "../views/player-view.js";
import CardController from "./card-controller.js";
import FieldController from "./field-controller.js";

class PlayerController {
    static players = [];

    static createPlayer(name, mode) {
        const player = new PlayerModel(name, mode);
        this.players.push(player);

        return player;
    }

    static getPlayerByCardId(cardId) {
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
        player.selectCard(card);
        PlayerView.selectCard(card);
    }

    static moveCardToField(player, card) {
        if (card) {
            FieldController.addCard(card);
            this.removeCardFromPlayer(player, card.getId());
            player.removeSelectedCard(card);
        }
    }

    static removeCardFromPlayer(player, cardId) {
        player.removeCard(cardId);
        this.renderPlayerCards(player);
    }

    static renderPlayerCards(player) {
        PlayerView.renderPlayer(player, (card) => {
            CardController.handleCardClick(player, card);
        });
    }
}

export default PlayerController;
