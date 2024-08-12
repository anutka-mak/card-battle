class CardView {
    static render(cardModel, container) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const rankLabel = document.createElement('div');
        rankLabel.classList.add('card__label');
        rankLabel.innerHTML = `${cardModel.getRank().name}`;

        const createSuitImage = (classNames) => {
            const suitImage = document.createElement('img');
            suitImage.src = `${cardModel.getSuit().imageUrl}`;
            suitImage.alt = `${cardModel.getSuit().name.toLowerCase()} icon`

            classNames.split(' ').forEach(className => suitImage.classList.add(className));

            return suitImage;
        };

        cardElement.appendChild(rankLabel);
        cardElement.appendChild(createSuitImage('image card__image_top-right'));
        cardElement.appendChild(createSuitImage('image card__image_size-m'));
        cardElement.appendChild(createSuitImage('image card__image_bottom-left'));

        cardElement.addEventListener('click', () => {
            cardElement.classList.toggle('selected');
        });

        container.appendChild(cardElement);
    }
}

export default CardView;
