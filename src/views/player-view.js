import CardView from "./card-view.js";

class PlayerView {
    static renderPlayer(player, cardClickCallback) {
        const cardBoard = document.querySelector('.card-board');
        const playerName = player.getName();
        const playerClassName = playerName.replace(/\s+/g, '-');
        const playerContainerId = `player-container-${playerClassName}`;

        let playerContainer = document.getElementById(playerContainerId);

        if (!playerContainer) {
            playerContainer = document.createElement('div');
            playerContainer.classList.add('player__cards');
            playerContainer.id = playerContainerId;
            cardBoard.appendChild(playerContainer);

            const playerInfoEl = document.createElement('div');
            playerInfoEl.classList.add('player__info');

            const playerNameEl = document.createElement('p');
            playerNameEl.textContent = `Player name: ${player.getName()}`;
            playerInfoEl.appendChild(playerNameEl);

            const playerStatusEl = document.createElement('p');
            playerStatusEl.textContent = `Player mode: ${player.getMode()}`;
            playerInfoEl.appendChild(playerStatusEl);

            const playerCardsEl = document.createElement('div');
            playerCardsEl.classList.add('player');
            playerCardsEl.id = `cards-container-${player.getName().replace(/\s+/g, '-')}`;

            playerContainer.appendChild(playerInfoEl);
            playerContainer.appendChild(playerCardsEl);
        }

        this.renderCards(player, cardClickCallback);
    }

    static renderCards(player, cardClickCallback) {
        const playerName = player.getName();
        const playerClassName = playerName.replace(/\s+/g, '-');

        const cardsContainerId = `cards-container-${playerClassName}`;
        const cardsContainer = document.getElementById(cardsContainerId);

        if (cardsContainer) {
            cardsContainer.textContent = '';
            const cards = player.getCards();
            cards.forEach(card => {
                CardView.render(card, cardsContainer, cardClickCallback);
            });
        }
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
