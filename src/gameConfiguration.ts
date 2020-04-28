export default class GameConfiguration {
    public cardsCount: number = 12;
    public sameCardsCount: number = 2;
    public timeToCompleteGame: number = 60000;

    public renderCardAmountInput(): void {
        const html = `<div class="cards-amount">
            <label for="cards-count">Set amount of cards</label>
            <input id="cards-count" type="number" min="4" max="22" step="2" value="12" required>
            <div class="cards-count-error"></div>
        </div>
        `;
        document.querySelector('.board-form').insertAdjacentHTML('afterbegin', html);
    }

    public renderSameCardsInput(): void {
        const html = `
        <div class="same-cards">
            <label>Find <input id="same-cards-input" type="number" min="2" max="4" step="1" value="2" required> same cards.</label>
            <div class="same-cards-error"></div>
        </div>
        `;

        document.querySelector('.board-form').insertAdjacentHTML('afterbegin', html);
    }

    public renderTimerProgressBar() {
        const html = `
            <div class='time-progress'></div>
        `;

        document.querySelector('.time-progressbar-wrapper').insertAdjacentHTML("afterbegin", html);
    }
}