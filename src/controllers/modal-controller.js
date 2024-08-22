import ModalView from "../views/modal-view.js";

class ModalController {
    static showModal(winnerName) {
        ModalView.createModal(winnerName);
    }
}

export default ModalController;