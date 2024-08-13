import CardView from "./card-view.js";

class PlayerView {
    static renderPlayer(player) {
        const playerInfoEl = document.createElement('div');
        playerInfoEl.classList.add('player__info');

        const playerNameEl = document.createElement('p');
        playerNameEl.textContent = `Player name: ${player.getName()}`;

        const playerStatusEl = document.createElement('p');
        playerStatusEl.textContent = `Player mode: ${player.getMode()}`;

        playerInfoEl.appendChild(playerNameEl);
        playerInfoEl.appendChild(playerStatusEl);

        const cardBoard = document.querySelector('.card-board');

        const playerCardsEl = document.createElement('div');
        playerCardsEl.classList.add('player');

        const cardsItemsEl = document.createElement('div');
        cardsItemsEl.classList.add('card-board__items');

        playerCardsEl.appendChild(playerInfoEl);
        playerCardsEl.appendChild(cardsItemsEl);
        cardBoard.appendChild(playerCardsEl);

        this.renderCards(player, cardsItemsEl);
    }

    static renderCards(player, container) {
        const cards = player.getCards();
        cards.forEach(card => {
            CardView.render(card, container);
        });
    }
}

export default PlayerView;
