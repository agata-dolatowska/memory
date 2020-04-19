import Board from './board';
import Gameplay from './gameplay';
import Card from './card';
import { imageNames } from './imageNames';

export default class Game {
    private board: Board;
    private gameplay: Gameplay;
    private imagesCount = imageNames.length;
    private selectedImagesIds: number[] = [];
    private cardEvent = this.manageCardsVisibility.bind(this);
    public cards: Card[] = [];

    public startGame(): void {
        this.board = new Board();
        this.board.createBoard();
        this.gameplay = new Gameplay(this.cards);
        this.selectRandomImages();
        this.createCards();
        this.addClickEventToCards();
    }

    public newGame(): void {
        this.gameplay.playerMoves = 0;
        document.querySelector('.board').innerHTML = '';
        this.board.renderEmptyCards();
        this.selectRandomImages();
        this.cards = [];
        this.createCards();
        this.gameplay = new Gameplay(this.cards);
        this.addClickEventToCards();
    }

    private selectRandomImages(): void {
        const uniqueCardsCount: number = this.board.cardCount / 2;
        let currentNumber: number = 0;

        for (let x = 0; this.selectedImagesIds.length < uniqueCardsCount; x++) {
            currentNumber = Math.floor(Math.random() * this.imagesCount);
            if (!this.selectedImagesIds.includes(currentNumber)) {
                this.selectedImagesIds.push(currentNumber);
            }
        }
    }

    private createCards() {
        let currentNumber: number = 0;
        let allIdsTwice: number[] = [...this.selectedImagesIds, ...this.selectedImagesIds];
        let idCounter: number = 0;

        for (let x = 0; this.cards.length < this.board.cardCount; x++) {
            currentNumber = Math.floor(Math.random() * allIdsTwice.length);

            if (this.cardOccurredLessThanTwice(imageNames[allIdsTwice[currentNumber]])) {
                this.cards.push(
                    new Card(imageNames[allIdsTwice[currentNumber]], idCounter)
                );
                allIdsTwice.splice(currentNumber, 1);
                idCounter++;
            }
        }
    }

    private cardOccurredLessThanTwice(x: string): boolean {
        const cardOccurrences = this.cards.filter(y => y.imageSrc == `${x}`);
        if (cardOccurrences.length < 2) {
            return true;
        }
        else {
            return false;
        }
    }

    private addClickEventToCards(): void {
        let allCards = document.getElementsByClassName('card');

        for (let x = 0; x < allCards.length; x++) {
            allCards[x].addEventListener('click', this.cardEvent);
        }
    }

    private manageCardsVisibility(e: Event): void {
        const clickedCardId: number = parseInt((e.target as Element).id);
        let facingUpCards = this.cards.filter(card => card.isFacingUp == true);

        this.gameplay.hideVisibleCards(facingUpCards);

        this.gameplay.showCard(clickedCardId);
        facingUpCards = this.cards.filter(card => card.isFacingUp == true);

        if (facingUpCards.length == 2) {
            if (this.gameplay.checkIfFoundPair(facingUpCards)) {
                document.querySelector(`[id='${clickedCardId}']`).removeEventListener('click', this.cardEvent);
            }
        }

        if (this.gameplay.checkIfGameCompleted()) {
            this.endGameMessage();
        }
    }

    public endGameMessage(): void {
        const html: string = `
        <div class='message-overlay'>
            <div class='message-wrapper'>
                <h1>You win!</h1>
                <p>Result - ${this.gameplay.playerMoves} clicks</p>
                <button id="new-game" class="button">Start new game</button>
            </div>
        </div>
        `;

        document.querySelector('body').insertAdjacentHTML('afterbegin', html);
        document.querySelector('.message-overlay').addEventListener('click', e => this.hideNewGameMessage());
    }

    public hideNewGameMessage(): void {
        document.querySelector('.message-overlay').removeEventListener('click', this.hideNewGameMessage);
        document.querySelector('.message-overlay').remove();
        this.newGame();
    }
};