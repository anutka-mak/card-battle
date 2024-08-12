class DeckView {
    static render(cardCount) {
        const deckElement = document.querySelector('.deck-count');
        deckElement.textContent = `Amount card in deck: ${cardCount}`;
    }
}

export default DeckView;