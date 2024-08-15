import CardView from "./card-view.js";

class FieldView {
    static renderCard(card, role) {
        const fieldElement = document.querySelector('.field');
        CardView.render(card, fieldElement, role);
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
