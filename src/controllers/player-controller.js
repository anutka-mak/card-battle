import PlayerModel from "../models/player-model.js";
import PlayerView from "../views/player-view.js";
import CardController from "./card-controller.js";
import FieldController from "./field-controller.js";
import DeckController from "./deck-controller.js";
import ModalController from "./modal-controller.js";

class PlayerController {
    static players = [];

    static createPlayer(name) {
        const mode = this.determinePlayerMode();
        const player = new PlayerModel(name, mode);
        this.players.push(player);
        this.renderPlayerCards(player);
        this.initializePlayerActions(player);

        return player;
    }

    static determinePlayerMode() {
        const attacker = 'attacker';
        const defender = 'defender';

        const countAttacker = this.players.filter(p => p.getMode() === attacker).length;
        const countDefender = this.players.filter(p => p.getMode() === defender).length;

        if (countAttacker === countDefender) {
            return Math.random() < 0.5 ? attacker : defender;
        }

        return countAttacker > countDefender ? defender : attacker;
    }

    static switchPlayersModes() {
        this.players.forEach(player => {
            this.changePlayerMode(player);
            this.renderPlayerCards(player);
            FieldController.handlePlayerClick(player);
        });
    }

    static changePlayerMode(player) {
        const currentMode = player.getMode();
        const attacker = 'attacker';
        const defender = 'defender';
        const mode = currentMode === attacker ? defender : attacker;

        player.setMode(mode);
        this.renderPlayerCards(player);
    }

    static getCardsCount(player) {
        return player.getCards().length;
    }

    static refillCards() {
        const MIN_CARDS_COUNT = 6;
        const players =  this.players;

        if (DeckController.getCardsCount() === 0) {
            return;
        }

        players.forEach(player => {
            const currentCardCount = this.getCardsCount(player);
            const cardsNeeded = MIN_CARDS_COUNT - currentCardCount;
            const takeCards = DeckController.drawCards(cardsNeeded);

            PlayerController.takeCards(player, takeCards);
        });
    }

    static getPlayerMode(player) {
        return player.getMode();
    }

    static findDefender() {
        const defender = 'defender';

        return this.players.find(player => player.getMode() === defender);
    }

    static findAttacker() {
        const attacker = 'attacker';

        return this.players.find(player => player.getMode() === attacker);
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
                player.clearSelectedCard();
            } else {
                console.log("This card cannot be added to the field.");
            }

            player.clearSelectedCard(player);
            this.renderPlayerCards(player);

            const playerDefender = PlayerController.findDefender();
            const playerAttacker = PlayerController.findAttacker();

            PlayerController.checkUnbeatenCards(playerDefender);
            PlayerController.checkAllCardsBeaten(playerAttacker);
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

    static checkUnbeatenCards(player) {
        if (!FieldController.checkAllCardsBeaten()) {
            PlayerView.enableTakeCardsButton(player);
        }
    }

    static checkAllCardsBeaten(player) {
        const allCardsBeaten = FieldController.checkAllCardsBeaten();
        const isFieldNotEmpty = !FieldController.isFieldEmpty();

        if (allCardsBeaten && isFieldNotEmpty) {
            PlayerView.enableDoneButton(player);
        }
    }

    static initializePlayerActions(player) {
        const playerMode = player.getMode();
        const attacker = 'attacker';

        if (playerMode === attacker) {
            PlayerView.onDoneButtonClick(() => this.handleDoneClick());
        } else {
            PlayerView.onTakeCardsButtonClick(() => this.handleTakeCardsClick());
        }
    }

    static moveFieldCardsToPlayer() {
        const fieldCards = FieldController.getFieldCards();
        const defender = PlayerController.findDefender();

        fieldCards.forEach(pair => {
            if (defender) {
                defender.addCard(pair.getAttacker());
                if (pair.getDefender()) {
                    defender.addCard(pair.getDefender());
                }
            }
        });

        this.renderPlayerCards(defender);
        FieldController.clearField();
    }

    static handleTakeCardsClick() {
        this.moveFieldCardsToPlayer();
        this.refillCards();
        this.checkForWinner();
    }

    static handleDoneClick() {
        FieldController.moveCardsToDiscard();
        this.refillCards();
        this.switchPlayersModes();
        this.checkForWinner();
    }

    static checkForWinner() {
        this.players.forEach(player => {
            const hasNoCards = PlayerController.getCardsCount(player) === 0;
            const isDeckEmpty = DeckController.getCardsCount() === 0;
            const playerName = player.getName();

            if (hasNoCards && isDeckEmpty) {
                ModalController.showModal(playerName);
            }
        });
    }
}

export default PlayerController;
