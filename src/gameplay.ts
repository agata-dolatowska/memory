import Card from './card';

export default class Gameplay {
    public playerMoves: number = 0;
    public cards: Card[] = [];
    public sameCards: number;

    constructor(cards: Card[], sameCards: number) {
        this.cards = cards;
        this.sameCards = sameCards;
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
            if (this.allFacingUpCardsHaveSameImage(facingUpCards)) {
                // if (facingUpCards[0].imageSrc == facingUpCards[1].imageSrc) {
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

    private allFacingUpCardsHaveSameImage(cardsUp: Card[]): boolean {
        const facingUpCards = cardsUp;
        const firstCardImage = facingUpCards[0].imageSrc;

        for (let cardId = 1; cardId < facingUpCards.length; cardId++) {
            if (firstCardImage != facingUpCards[cardId].imageSrc) {
                return false;
            }
        }
        return true;
    }

    public hideVisibleCards(FacingUpCards: Card[]): void {
        const facingUpCards = FacingUpCards;
        if (facingUpCards.length == this.sameCards) {
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