import PlayerView from "../views/player-view.js";
import FieldController from "./field-controller.js";
import PlayerModel from "../models/player-model.js";

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

    static getPlayerByName(name) {
        return this.players.find(player => player.getName() === name);
    }

    static getPlayerByMode(mode) {
        return this.players.find(player => player.getMode() === mode);
    }

    static changePlayerMode(player, mode) {
        player.setMode(mode);
    }

    static addCardToPlayer(player, card) {
        player.addCard(card);
        PlayerView.renderCards(player);
    }

    static removeCardFromPlayer(player, card) {
        player.removeCard(card);
        PlayerView.renderCards(player);
    }

    static takeCards(player, cards) {
        cards.forEach(card => this.addCardToPlayer(player, card));
    }

    static selectCard(player, card) {
        player.selectCard(card);
        PlayerView.selectCard(card);
    }

    static moveCardToField(player) {
        const selectedCard = player.getSelectedCard();

        if (selectedCard) {
            FieldController.addCard(selectedCard);
            this.removeCardFromPlayer(player, selectedCard);
            player.clearSelectedCard();
            PlayerView.renderCards(player);
        }
    }

    static renderPlayerCards(player) {
        PlayerView.renderPlayer(player);
    }
}

export default PlayerController;
