import Board from './board';
import Gameplay from './gameplay';
import Cards from './cards';
import GameConfiguration from './gameConfiguration';

export default class Game {
    private board: Board;
    private gameplay: Gameplay;
    private gameConfiguration: GameConfiguration;
    private cards: Cards;
    private cardEvent = this.manageCardsVisibility.bind(this);
    private cardInputEvent = this.updateCardCount.bind(this);

    constructor() {
        this.gameConfiguration = new GameConfiguration;
        this.gameConfiguration.renderCardAmountInput();
        document.querySelector('#cards-count').addEventListener('click', this.cardInputEvent);
    }

    public updateCardCount() {
        this.gameConfiguration.cardsCount = parseInt((<HTMLInputElement>document.querySelector('#cards-count')).value);
        this.newGame();
    }

    public newGame(): void {
        if (!document.querySelector('.board')) {
            this.board = new Board();
            this.board.renderBoard();
        }

        document.querySelector('.board').innerHTML = '';
        this.cards = new Cards(this.gameConfiguration.cardsCount);
        this.cards.createCards();
        this.gameplay = new Gameplay(this.cards.cardsList);
        this.gameplay.playerMoves = 0;
        this.addClickEventToCards();
    }

    private addClickEventToCards(): void {
        let allCards = document.getElementsByClassName('card');

        for (let cardDivId = 0; cardDivId < allCards.length; cardDivId++) {
            allCards[cardDivId].addEventListener('click', this.cardEvent);
        }
    }

    private manageCardsVisibility(e: Event): void {
        const clickedCardId: number = parseInt((e.target as Element).id);
        let facingUpCards = this.cards.cardsList.filter(card => card.isFacingUp == true);

        this.gameplay.hideVisibleCards(facingUpCards);

        this.gameplay.showCard(clickedCardId);
        facingUpCards = this.cards.cardsList.filter(card => card.isFacingUp == true);

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