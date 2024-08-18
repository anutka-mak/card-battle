class TrumpCardView {
    static renderTrumpCard(trumpCard) {
        const trumpEl = document.querySelector('.trump-suit');
        trumpEl.textContent = `Trump suit: `;

        const trumpImage = document.createElement('img');
        trumpImage.classList.add('trump-image');
        trumpImage.src = trumpCard.getSuit().imageUrl;
        trumpImage.alt = `Trump suit - ${trumpCard.getSuit().name}`;
        trumpEl.appendChild(trumpImage);
    }
}

export default TrumpCardView;
