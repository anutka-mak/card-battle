class CardView {
    static render(cardModel, container) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const rankLabel = document.createElement('div');
        const rank = cardModel.getRank();

        rankLabel.classList.add('card__label');
        rankLabel.textContent = `${rank.name}`;

        const createSuitImage = (classNames) => {
            const suitImage = document.createElement('img');
            const suit = cardModel.getSuit();

            suitImage.src = `${suit.imageUrl}`;
            suitImage.alt = `${suit.name.toLowerCase()} icon`

            classNames.split(' ').forEach(className => suitImage.classList.add(className)); //спростити

            return suitImage;
        };

        const suitImageTopRight = createSuitImage('image card__image_top-right');
        const suitImageBottomLeft = createSuitImage('image card__image_bottom-left');
        const suitImage = createSuitImage('image card__image_size-m');

        cardElement.appendChild(rankLabel);
        cardElement.appendChild(suitImageTopRight);
        cardElement.appendChild(suitImage);
        cardElement.appendChild(suitImageBottomLeft);

        cardElement.addEventListener('click', () => {
            cardElement.classList.toggle('selected');
        });

        container.appendChild(cardElement);
    }
}

export default CardView;