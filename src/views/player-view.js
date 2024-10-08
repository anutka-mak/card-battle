import CardView from "./card-view.js";

class PlayerView {
    static getPlayerContainer(player) {
        const playerName = player.getName();
        const playerNameWithDashes = playerName.replace(/\s+/g, '-');
        const playerClassName = playerNameWithDashes.toLowerCase();

        return document.querySelector(`.${playerClassName}`);
    }

    static renderPlayer(player) {
        const playerContainer = this.getPlayerContainer(player);

        if (playerContainer) {
            playerContainer.replaceChildren();

            const playerInfoContainer = document.createElement('div');
            playerInfoContainer.classList.add('player-info');

            const playerNameEl = document.createElement('p');
            playerNameEl.textContent = `Player name: ${player.getName()}`;
            playerInfoContainer.appendChild(playerNameEl);

            const playerStatusEl = document.createElement('p');
            playerStatusEl.textContent = `Player mode: ${player.getMode()}`;
            playerInfoContainer.appendChild(playerStatusEl);

            playerContainer.appendChild(playerInfoContainer);

            this.renderCards(player, playerContainer);
            this.renderActions(playerContainer);
        }
    }

    static renderCards(player, container) {
        const cards = player.getCards();
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('player-cards');

        cards.forEach(card => {
            CardView.render(card, cardsContainer);
        });

        container.appendChild(cardsContainer);
    }

    static renderActions(container) {
        const actionsContainer = document.createElement('div');
        actionsContainer.classList.add('player-actions');

        const takeCardsButton = document.createElement('button');
        takeCardsButton.classList.add('player-actions__take-cards-button');
        takeCardsButton.textContent = 'take cards';
        takeCardsButton.disabled = true;
        takeCardsButton.addEventListener('click', (event) => {
            if (this.takeCardsButtonClickCallback) {
                this.takeCardsButtonClickCallback();
            }
        });

        const doneButton = document.createElement('button');
        doneButton.classList.add('player-actions__done-button');
        doneButton.textContent = 'done';
        doneButton.disabled = true;
        doneButton.addEventListener('click', (event) => {
            if (this.doneButtonClickCallback) {
                this.doneButtonClickCallback();
            }
        });

        actionsContainer.appendChild(takeCardsButton);
        actionsContainer.appendChild(doneButton);

        container.appendChild(actionsContainer);
    }

    static enableTakeCardsButton(player) {
        const playerContainer = this.getPlayerContainer(player);
        const takeCardsButton = playerContainer.querySelector('.player-actions__take-cards-button');
        takeCardsButton.disabled = false;
    }

    static enableDoneButton(player) {
        const playerContainer = this.getPlayerContainer(player);
        const doneButton = playerContainer.querySelector('.player-actions__done-button');
        doneButton.disabled = false;
    }

    static selectCard(card) {
        this.removeSelectedCard();
        this.addSelectedCard(card);
    }

    static addSelectedCard(card) {
        card.element.classList.add('selected');
    }

    static removeSelectedCard() {
        const selectedCards = document.querySelectorAll('.selected');
        selectedCards.forEach(card => card.classList.remove('selected'));
    }

    static onTakeCardsButtonClick(callback) {
        this.takeCardsButtonClickCallback = callback;
    }

    static onDoneButtonClick(callback) {
        this.doneButtonClickCallback = callback;
    }
}

export default PlayerView;
