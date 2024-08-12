class DeckView {
    static render(cardCount) {
        const deckElement = document.querySelector('.deck-count');
        deckElement.innerHTML = `Amount card in deck: ${cardCount}`;
    }
}

export default DeckView;
