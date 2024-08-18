import PlayerView from "./player-view.js";

class CardView {
    static render(card, container, role) {
        const rank = card.getRank();
        const suit = card.getSuit();

        const generatedId = `${suit.name.toLowerCase()}-${rank.name.toLowerCase()}`;
        card.setId(generatedId);

        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.id = card.getId();

        if (role !== undefined) {
            cardEl.classList.add(`card__${role}`);
        }

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

        cardEl.appendChild(rankLabel);
        cardEl.appendChild(suitImageTopRight);
        cardEl.appendChild(suitImageCenter);
        cardEl.appendChild(suitImageBottomLeft);

        container.appendChild(cardEl);

        const handleClick = card.getHandleClick();

        cardEl.addEventListener('click', () => {
            if (handleClick) handleClick();
            cardEl.classList.toggle('selected');
            PlayerView.selectCard(card);
        });

        card.element = cardEl;
    }
}

export default CardView;
