import CardView from "./card-view.js";

class FieldView {
    static renderCard(card, role, container) {
        CardView.render(card, container, role);
    }

    static renderCardPair(pair) {
        const fieldElement = document.querySelector('.field');
        const pairContainer = document.createElement('div');
        pairContainer.classList.add('pair-card');

        const attackerCard = pair.getAttacker();
        const defenderCard = pair.getDefender();

        this.renderCard(attackerCard, 'attacker', pairContainer);

        if (defenderCard) {
            this.renderCard(defenderCard, 'defender', pairContainer);
        }

        fieldElement.appendChild(pairContainer);
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
