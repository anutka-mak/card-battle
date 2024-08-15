class CardPairModel {
    constructor() {
        this.attacker = null;
        this.defender = null;
    }

    getAttacker() {
        return this.attacker;
    }

    setAttacker(attackerCard) {
        this.attacker = attackerCard;
    }

    getDefender() {
        return this.defender;
    }

    setDefender(defenderCard) {
        this.defender = defenderCard;
    }

    isPairComplete() {
        return this.attacker && this.defender;
    }
}

export default CardPairModel;
