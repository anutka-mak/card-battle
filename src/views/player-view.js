import CardView from "./card-view.js";

class PlayerView {
    static renderPlayer(player) {
        const playerName = player.getName();
        const playerNameWithDashes = playerName.replace(/\s+/g, '-');
        const playerClassName = playerNameWithDashes.toLowerCase();
        const playerContainer = document.querySelector(`.${playerClassName}`);

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

        const doneButton = document.createElement('button');
        doneButton.classList.add('player-actions__done-button');
        doneButton.textContent = 'done';

        actionsContainer.appendChild(takeCardsButton);
        actionsContainer.appendChild(doneButton);

        container.appendChild(actionsContainer);
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
}

export default PlayerView;
