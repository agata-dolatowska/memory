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
    private sameCardsInputEvent = this.updateSameCardsCount.bind(this);
    private playingDuration: number;
    private startGameDate: number;

    constructor() {
        this.gameConfiguration = new GameConfiguration;
        this.gameConfiguration.renderCardAmountInput();
        document.querySelector('#cards-count').addEventListener('click', this.cardInputEvent);
        this.gameConfiguration.renderSameCardsInput();
        document.querySelector('#same-cards-input').addEventListener('click', this.sameCardsInputEvent);
        this.gameConfiguration.renderTimerProgressBar();
    }

    private updateCardCount() {
        this.gameConfiguration.cardsCount = parseInt((<HTMLInputElement>document.querySelector('#cards-count')).value);
        this.newGame();
    }

    private updateSameCardsCount() {
        this.gameConfiguration.sameCards = parseInt((<HTMLInputElement>document.querySelector('#same-cards-input')).value);

        if (parseInt((<HTMLInputElement>document.querySelector('#cards-count')).value) % this.gameConfiguration.sameCards != 0) {
            this.gameConfiguration.cardsCount = 12;
        }
        (<HTMLInputElement>document.querySelector('#cards-count')).step = `'${this.gameConfiguration.sameCards}'`;

        this.newGame();
    }

    public newGame(): void {
        if (!document.querySelector('.board')) {
            this.board = new Board();
            this.board.renderBoard();
        }

        document.querySelector('.board').innerHTML = '';
        this.cards = new Cards(this.gameConfiguration.cardsCount, this.gameConfiguration.sameCards);
        this.cards.createCards();
        this.gameplay = new Gameplay(this.cards.cardsList, this.gameConfiguration.sameCards);
        this.gameplay.playerMoves = 0;
        this.addClickEventToCards();
        this.startGameDate = new Date().getTime();
        this.playingDuration = window.setTimeout(this.gameOver, this.gameConfiguration.timeToCompleteGame);
        document.querySelector('.time-progress').classList.add('timer');
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

        if (facingUpCards.length == this.gameConfiguration.sameCards) {
            if (this.gameplay.checkIfFoundPair(facingUpCards)) {
                document.querySelector(`[id='${clickedCardId}']`).removeEventListener('click', this.cardEvent);
            }
        }

        if (this.gameplay.checkIfGameCompleted()) {
            this.endGameMessage();
        }
    }

    private gameOver(): void {
        const html: string = `
        <div class='message-overlay'>
            <div class='message-wrapper'>
                <h1>Time over!</h1>
                <button id="new-game" class="button">Start new game</button>
            </div>
        </div>
        `;
        document.querySelector('.time-progress').classList.remove('timer');

        clearTimeout(this.playingDuration);

        document.querySelector('body').insertAdjacentHTML('afterbegin', html);
        document.querySelector('#new-game').addEventListener('click', e => this.hideNewGameMessage());
    }

    private endGameMessage(): void {
        const elapsedTime = Math.ceil((new Date().getTime() - this.startGameDate) / 1000);
        clearTimeout(this.playingDuration);
        document.querySelector('.time-progress').classList.remove('timer');

        const html: string = `
        <div class='message-overlay'>
            <div class='message-wrapper'>
                <h1>You win!</h1>
                <p>Result - ${this.gameplay.playerMoves} clicks</p>
                <p>Time - ${elapsedTime} seconds</p>
                <button id="new-game" class="button">Start new game</button>
            </div>
        </div>
        `;

        document.querySelector('body').insertAdjacentHTML('afterbegin', html);
        document.querySelector('#new-game').addEventListener('click', e => this.hideNewGameMessage());
    }

    private hideNewGameMessage(): void {
        document.querySelector('#new-game').removeEventListener('click', this.hideNewGameMessage);
        document.querySelector('.message-overlay').remove();
        this.newGame();
    }
};