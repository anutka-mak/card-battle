class ModalView {
    static createModal(winnerName) {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal');

        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');

        const modalLabel = document.createElement('div');
        modalLabel.classList.add('modal-header__label');
        modalLabel.textContent = 'Congratulations!';

        const closeButton = document.createElement('button');
        closeButton.textContent = '⨉';
        closeButton.classList.add('modal-header__button');

        modalHeader.appendChild(modalLabel);
        modalHeader.appendChild(closeButton);

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const modalMessage = document.createElement('div');
        modalMessage.classList.add('modal-content__message');

        const playerName = document.createElement('span');
        playerName.classList.add('player-name');
        playerName.textContent = `${winnerName}`;

        const messageSuffix = document.createElement('span');
        messageSuffix.classList.add('text')
        messageSuffix.textContent = '! You have won the game!';

        modalMessage.appendChild(playerName);
        modalMessage.appendChild(messageSuffix);

        const image = document.createElement('img');
        image.classList.add('modal-content__image')
        image.src = '/assets/images/trophy.png';
        image.alt = `trophy image`;

        const okButton = document.createElement('button');
        okButton.textContent = 'OK';
        okButton.classList.add('modal-content__button');

        modalContent.appendChild(modalMessage);
        modalContent.appendChild(image);
        modalContent.appendChild(okButton);

        modalContainer.appendChild(modalHeader);
        modalContainer.appendChild(modalContent);

        document.body.appendChild(overlay);
        document.body.appendChild(modalContainer);

        closeButton.addEventListener('click', () => {
            ModalView.closeModal();
            window.location.reload();
        });

        okButton.addEventListener('click', () => {
            ModalView.closeModal();
            window.location.reload();
        });

        overlay.addEventListener('click', () => {
            ModalView.closeModal();
            window.location.reload();
        });
    }

    static closeModal() {
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');

        if (modal) {
            document.body.removeChild(modal);
        }

        if (overlay) {
            document.body.removeChild(overlay);
        }
    }
}

export default ModalView;