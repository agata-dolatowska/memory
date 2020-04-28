import Board from './board';
import Gameplay from './gameplay';
import CardsCreator from './cardsCreator';
import GameConfiguration from './gameConfiguration';

export default class Game {
    private board: Board;
    private gameplay: Gameplay;
    private gameConfiguration: GameConfiguration;
    private cardsCreator: CardsCreator;
    private cardEvent = this.manageCardsVisibility.bind(this);
    private cardInputEvent = this.updateCardCount.bind(this);
    private sameCardsInputEvent = this.updateSameCardsCount.bind(this);
    private endGameMessageEvent = this.hideNewGameMessage.bind(this);
    private playingDuration: number;
    private startGameDate: number;

    constructor() {
        this.board = new Board();
        this.board.renderBoard();
        this.gameConfiguration = new GameConfiguration;
        this.gameConfiguration.renderCardAmountInput();
        document.querySelector('#cards-count').addEventListener('input', this.cardInputEvent);
        this.gameConfiguration.renderSameCardsInput();
        document.querySelector('#same-cards-input').addEventListener('input', this.sameCardsInputEvent);
    }

    private updateCardCount() {
        const cardCountElement = <HTMLInputElement>document.querySelector('#cards-count');
        const cardCountErrorElement = document.querySelector('.cards-count-error');

        cardCountErrorElement.innerHTML = '';
        if (cardCountElement.classList.contains('invalid')) {
            cardCountElement.classList.remove('invalid');
            cardCountErrorElement.classList.remove('error-active');
        }

        const errorMessage = this.validateCardCount(cardCountElement);

        if (errorMessage !== undefined) {
            cardCountErrorElement.insertAdjacentText('afterbegin', errorMessage);
            cardCountElement.classList.add('invalid');
            cardCountErrorElement.classList.add('error-active');
        } else {
            this.gameConfiguration.cardsCount = parseInt((<HTMLInputElement>cardCountElement).value);
            this.newGame();
        }
    }

    private validateCardCount(cardCountEl: HTMLInputElement): string | undefined {
        const cardCountElement = cardCountEl;

        if (cardCountElement.validity.rangeOverflow) {
            cardCountElement.value = '22';
            return 'max required value 22';
        }

        if (cardCountElement.validity.rangeUnderflow) {
            cardCountElement.value = '4';
            return 'minimal required value 4';
        }

        if (cardCountElement.validity.valueMissing) {
            return "Card count can't be empty, accepted values 4-22";
        }

        if (cardCountElement.validity.stepMismatch) {
            return `Amount of cards should be a multiple of ${this.gameConfiguration.sameCardsCount}`;
        }
    }

    private updateSameCardsCount() {
        const sameCardsElement = <HTMLInputElement>document.querySelector('#same-cards-input');
        const sameCardsErrorElement = document.querySelector('.same-cards-error');

        if (sameCardsElement.classList.contains('invalid')) {
            sameCardsElement.classList.remove('invalid');
            sameCardsErrorElement.classList.remove('error-active');

        }
        sameCardsErrorElement.innerHTML = '';

        const errorMessage = this.validateSameCardsCount(sameCardsElement);

        if (errorMessage !== undefined) {
            sameCardsErrorElement.insertAdjacentText('afterbegin', errorMessage);
            sameCardsElement.classList.add('invalid');
            sameCardsErrorElement.classList.add('error-active');
        } else {
            this.gameConfiguration.sameCardsCount = parseInt(sameCardsElement.value);

            (<HTMLInputElement>document.querySelector('#cards-count')).step = `'${this.gameConfiguration.sameCardsCount}'`;

            document.querySelector('.time-progress').classList.remove('timer');
            this.newGame();
        }
    }

    private validateSameCardsCount(sameCardsEl: HTMLInputElement): string | undefined {
        const sameCardsElement = sameCardsEl;

        if (sameCardsElement.validity.valueMissing) {
            return `This field cant't be empty`;
        }

        if (sameCardsElement.validity.rangeOverflow) {
            sameCardsElement.value = '4';
            return 'max required value - 4'
        }

        if (sameCardsElement.validity.rangeUnderflow) {
            sameCardsElement.value = '2';
            return 'min required value - 2';
        }
    }

    public newGame(): void {
        if (document.querySelector('.time-progress')) {
            document.querySelector('.time-progressbar-wrapper').innerHTML = '';
        }

        clearTimeout(this.playingDuration);
        document.querySelector('.board').innerHTML = '';
        this.cardsCreator = new CardsCreator(this.gameConfiguration.cardsCount, this.gameConfiguration.sameCardsCount);
        this.cardsCreator.createCards();
        this.gameplay = new Gameplay(this.cardsCreator.cardsList, this.gameConfiguration.sameCardsCount);
        this.gameplay.playerMoves = 0;
        this.addClickEventToCards();
        this.startGameDate = new Date().getTime();
        this.playingDuration = window.setTimeout(this.gameOver.bind(this), this.gameConfiguration.timeToCompleteGame);
        this.gameConfiguration.renderTimerProgressBar();
    }

    private addClickEventToCards(): void {
        let allCards = document.getElementsByClassName('card');

        for (let cardDivId = 0; cardDivId < allCards.length; cardDivId++) {
            allCards[cardDivId].addEventListener('click', this.cardEvent);
        }
    }

    private manageCardsVisibility(e: Event): void {
        const clickedCardId: number = parseInt((e.target as Element).id);
        let facingUpCards = this.cardsCreator.cardsList.filter(card => card.isFacingUp === true);

        this.gameplay.hideVisibleCards(facingUpCards);

        this.gameplay.showCard(clickedCardId);
        facingUpCards = this.cardsCreator.cardsList.filter(card => card.isFacingUp === true);

        if (facingUpCards.length === this.gameConfiguration.sameCardsCount) {
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
        document.querySelector('.time-progressbar-wrapper').innerHTML = '';

        clearTimeout(this.playingDuration);

        document.querySelector('body').insertAdjacentHTML('afterbegin', html);
        document.querySelector('#new-game').addEventListener('click', this.endGameMessageEvent);
    }

    private endGameMessage(): void {
        const elapsedTime = Math.ceil((new Date().getTime() - this.startGameDate) / 1000);
        clearTimeout(this.playingDuration);
        document.querySelector('.time-progressbar-wrapper').innerHTML = '';

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
        document.querySelector('#new-game').addEventListener('click', this.endGameMessageEvent);
    }

    private hideNewGameMessage(): void {
        document.querySelector('#new-game').removeEventListener('click', this.endGameMessageEvent);
        document.querySelector('.message-overlay').remove();
        this.newGame();
    }
};