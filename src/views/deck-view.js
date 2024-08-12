class DeckView {
    constructor(deckController) {
        this.deckController = deckController;
        this.deckElement = document.querySelector('.deck-count');
    }

    render() {
        this.deckElement.innerHTML = `Amount card in deck: ${this.deckController.getCardsCount()}`;
    }
}

export default DeckView;
