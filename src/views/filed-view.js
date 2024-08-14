import CardView from "./card-view.js";

class FieldView {
    static renderCard(card) {
        const fieldElement = document.querySelector('.field');
        CardView.render(card, fieldElement);
    }

    static onFieldClick(player, callback) {
        const fieldElement = document.querySelector('.field');

        fieldElement.addEventListener('click', () => { callback(player) });
    }

    static clearField() {
        const fieldElement = document.querySelector('.field');
        fieldElement.textContent = '';
    }
}

export default FieldView;
