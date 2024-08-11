class CardView {
    constructor(model) {
        this.model = model;
        this.element = null;
    }

    createCard(suit, rank) {
        this.model.setSuit(suit);
        this.model.setRank(rank);
    }

    render() {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const rankLabel = document.createElement('div');
        rankLabel.classList.add('card__label');
        rankLabel.innerHTML = `${this.model.getRank().name}`;

        const createSuitImage = (classNames) => {
            const suitImage = document.createElement('img');
            suitImage.src = `${this.model.getSuit().imageUrl}`;
            suitImage.alt = `${this.model.getSuit().name.toLowerCase()} icon`

            classNames.split(' ').forEach(className => suitImage.classList.add(className));

            return suitImage;
        };

        cardElement.appendChild(rankLabel);
        cardElement.appendChild(createSuitImage('image card__image_top-right'));
        cardElement.appendChild(createSuitImage('image card__image_size-m'));
        cardElement.appendChild(createSuitImage('image card__image_bottom-left'));

        this.element = cardElement;

        cardElement.addEventListener('click', () => {
            this.toggleSelected();
        });

        const cardBoard = document.querySelector('.card-board');
        cardBoard.appendChild(cardElement);
    }

    toggleSelected() {
        if (this.element) {
            this.element.classList.toggle('selected');
        }
    }
}

export default CardView;
