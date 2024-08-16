import CardView from "./card-view.js";

class FieldView {
    static renderCard(card, role, container) {
        CardView.render(card, container, role);
    }

    static renderCardPair(cardPair) {
        const fieldElement = document.querySelector('.field');
        const pairContainer = document.createElement('div');
        pairContainer.classList.add('pair-card');

        const attackerCard = cardPair.getAttacker();
        const defenderCard = cardPair.getDefender();

        this.renderCard(attackerCard, 'attacker', pairContainer);

        if (defenderCard) {
            this.renderCard(defenderCard, 'defender', pairContainer);
        }

        fieldElement.appendChild(pairContainer);
        return pairContainer;
    }

    static onPairCardClick(callback) {
        const pairCardElements = document.querySelectorAll('.pair-card');
        pairCardElements.forEach(pairCardElement => {
            pairCardElement.addEventListener('click', () => callback(pairCardElement));
        });
    }

    static onFieldClick(callback) {
        const fieldElement = document.querySelector('.field');
        fieldElement.addEventListener('click', callback);
    }

    static clearField() {
        const fieldElement = document.querySelector('.field');
        fieldElement.textContent = '';
    }
}

export default FieldView;
