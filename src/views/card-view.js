import PlayerView from "./player-view.js";

class CardView {
    static render(card, container, role) {
        const rank = card.getRank();
        const suit = card.getSuit();

        const generatedId = `${suit.name.toLowerCase()}-${rank.name.toLowerCase()}`;
        card.setId(generatedId);

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        if (role !== undefined) {
            cardElement.classList.add(`card__${role}`);
        }
        cardElement.id = card.getId();

        const rankLabel = document.createElement('div');
        rankLabel.classList.add('card__label');
        rankLabel.textContent = `${rank.name}`;

        const createSuitImage = (classNames) => {
            const suitImage = document.createElement('img');
            suitImage.src = `${suit.imageUrl}`;
            suitImage.alt = `${suit.name.toLowerCase()} icon`;

            const classList = classNames.split(' ');
            classList.forEach((className) => {
                suitImage.classList.add(className);
            });

            return suitImage;
        };

        const suitImageTopRight = createSuitImage('image card__image_top-right');
        const suitImageBottomLeft = createSuitImage('image card__image_bottom-left');
        const suitImageCenter = createSuitImage('image card__image_size-m');

        cardElement.appendChild(rankLabel);
        cardElement.appendChild(suitImageTopRight);
        cardElement.appendChild(suitImageCenter);
        cardElement.appendChild(suitImageBottomLeft);

        container.appendChild(cardElement);

        const handleClick = card.getHandleClick();

        cardElement.addEventListener('click', () => {
            if (handleClick) handleClick();
            cardElement.classList.toggle('selected');
            PlayerView.selectCard(card);
        });

        card.element = cardElement;
    }
}

export default CardView;
