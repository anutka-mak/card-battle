import CardView from "./card-view.js";

class FieldView {
    static renderCard(card, role, container) {
        CardView.render(card, container, role);
    }

    static renderCardPair(cardPair) {
        const fieldElement = document.querySelector('.field');
        const pairContainer = document.createElement('div');
        const pairId = cardPair.getAttacker().getId()

        pairContainer.classList.add('pair-card');
        pairContainer.id = `${pairId}`;

        const attackerCard = cardPair.getAttacker();
        const defenderCard = cardPair.getDefender();

        this.renderCard(attackerCard, 'attacker', pairContainer);

        if (defenderCard) {
            this.renderCard(defenderCard, 'defender', pairContainer);
        }

        pairContainer.addEventListener('click', (event) => {
            event.stopPropagation();
            this.pairClickCallback(cardPair, pairContainer);
        });

        fieldElement.appendChild(pairContainer);
        return pairContainer;
    }

    static onPairCardClick(callback) {
        this.pairClickCallback = callback;
    }

    static onFieldClick(callback) {
        const fieldElement = document.querySelector('.field');
        fieldElement.addEventListener('click', callback);
    }

    static clearField() {
        const fieldElement = document.querySelector('.field');
        fieldElement.replaceChildren();
    }
}

export default FieldView;
