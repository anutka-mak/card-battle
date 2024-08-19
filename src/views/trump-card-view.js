class TrumpCardView {
    static renderTrumpCard(trumpCard) {
        const trumpEl = document.querySelector('.trump-suit');
        trumpEl.textContent = `Trump suit: `;

        const trumpImage = document.createElement('img');
        trumpImage.classList.add('trump-image');
        trumpImage.src = trumpCard.getSuit().imageUrl;

        const trumpSuit = trumpCard.getSuit().name;
        trumpImage.alt = `trump suit - ${trumpSuit.toLowerCase()}`;
        trumpEl.appendChild(trumpImage);
    }
}

export default TrumpCardView;
