import PlayerModel from "../models/player-model.js";
import PlayerView from "../views/player-view.js";

class PlayerController {
    static players = [];

    static createPlayer(name, mode) {
        const player = new PlayerModel(name, mode);
        this.players.push(player);
        return player;
    }

    static addCardToPlayer(player, card) {
        player.addCard(card);
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

    static removeCardFromPlayer(player, card) {
        player.removeCard(card);
    }

    static renderPlayerCards(player) {
        PlayerView.renderPlayer(player);
    }

    static takeCards(player, card) {
        this.addCardToPlayer(player, card)
    }
}

export default PlayerController;