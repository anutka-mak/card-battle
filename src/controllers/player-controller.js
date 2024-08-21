import PlayerModel from "../models/player-model.js";
import PlayerView from "../views/player-view.js";
import CardController from "./card-controller.js";
import FieldController from "./field-controller.js";
import DeckController from "./deck-controller.js";

class PlayerController {
    static players = [];

    static createPlayer(name) {
        const mode = this.determinePlayerMode();
        const player = new PlayerModel(name, mode);
        this.players.push(player);
        this.renderPlayerCards(player);

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

    static getCardsCount(player) {
        return player.getCards().length;
    }

    static refillCards() {
        const MIN_CARDS_COUNT = 6;
        const players =  this.players;

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
        if (!FieldController.areAllCardsBeaten()) {
            PlayerView.enableTakeCardsButton(player);
        }
    }

    static checkAllCardsBeaten(player) {
        if (FieldController.areAllCardsBeaten()) {
            PlayerView.enableDoneButton(player);
        }
    }

    static initializePlayerActions(player) {
        const playerMode = player.getMode();
        const attacker = 'attacker';

        if (playerMode === attacker) {
            PlayerView.onDoneButtonClick(() => this.handleDoneClick());
        } else {
            PlayerView.onTakeCardsButtonClick(() => this.handleTakeCardsClick(player));
        }
    }

    static moveFieldCardsToPlayer(player) {
        const fieldPairs = FieldController.getFieldCards();

        fieldPairs.forEach(pair => {
            const attackerCard = pair.getAttacker();
            const defenderCard = pair.getDefender();

            if (attackerCard) {
                player.addCard(attackerCard);
            }

            if (defenderCard) {
                player.addCard(defenderCard);
            }
        });

        FieldController.clearField();
        this.renderPlayerCards(player);
    }


    static handleTakeCardsClick(player) {
        this.moveFieldCardsToPlayer(player);
        this.refillCards();
    }

    static handleDoneClick() {
        FieldController.moveCardsToDiscard();
        this.refillCards();
    }
}

export default PlayerController;
