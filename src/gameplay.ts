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

    public checkIfFoundPair(FacingUpCards: Card[]): boolean {
        const facingUpCards = FacingUpCards;

        if (facingUpCards != undefined) {
            if (facingUpCards[0].imageSrc == facingUpCards[1].imageSrc) {
                for (let cardIndex = 0; cardIndex < facingUpCards.length; cardIndex++) {
                    this.cards[facingUpCards[cardIndex].id].isFacingUp = false;
                    this.cards[facingUpCards[cardIndex].id].pairFound = true;
                    document.querySelector(`[id='${facingUpCards[cardIndex].id}']`).classList.add('pair-found');
                }
                return true;
            }
        }
        return false;
    }

    public hideVisibleCards(FacingUpCards: Card[]): void {
        const facingUpCards = FacingUpCards;
        if (facingUpCards.length == 2) {
            for (let cardIndex = 0; cardIndex < facingUpCards.length; cardIndex++) {
                document.querySelector(`#card${this.cards[facingUpCards[cardIndex].id].id}`).remove();
                this.cards[facingUpCards[cardIndex].id].isFacingUp = false;
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