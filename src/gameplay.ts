import Card from './card';

export default class Gameplay {
    public playerMoves: number = 0;
    public cards: Card[] = [];

    constructor(cards: Card[]) {
        this.cards = cards;
    }

    public showCard(clickedCardId: number): void {
        this.playerMoves++;
        if (this.cards[clickedCardId].pairFound == false) {
            this.cards[clickedCardId].isFacingUp = true;

            const html = `<img src='${this.cards[clickedCardId].imageSrc}' id='card${clickedCardId}'>`;

            document.querySelector(`[id='${clickedCardId}']`).insertAdjacentHTML('afterbegin', html);
        }
    }

    public checkIfFoundPair(x: Card[]): boolean {
        const facingUpCards = x;

        if (facingUpCards != undefined) {
            if (facingUpCards[0].imageSrc == facingUpCards[1].imageSrc) {
                for (let x = 0; x < facingUpCards.length; x++) {
                    this.cards[facingUpCards[x].id].isFacingUp = false;
                    this.cards[facingUpCards[x].id].pairFound = true;
                    document.querySelector(`[id='${facingUpCards[x].id}']`).classList.add('pair-found');
                }
                console.log('KUPA :3');

                return true;
            }
        }
        return false;
    }

    public hideVisibleCards(x: Card[]): void {
        const facingUpCards = x;
        if (facingUpCards.length == 2) {
            for (let x = 0; x < facingUpCards.length; x++) {
                document.querySelector(`#card${this.cards[facingUpCards[x].id].id}`).remove();
                this.cards[facingUpCards[x].id].isFacingUp = false;
            }
        }
    }

    public checkIfGameCompleted(): boolean {
        const cardsWithFoundPair = this.cards.filter(card => card.pairFound == true);

        if (cardsWithFoundPair.length == this.cards.length) {
            return true;
        } else {
            return false;
        }
    }
}