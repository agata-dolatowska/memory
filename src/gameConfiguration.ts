export default class GameConfiguration {
    public cardsCount: number = 12;
    public sameCards: number = 2;
    public timeToCompleteGame: number = 60000;
    public renderCardAmountInput(): void {
        const html = `<div class="cards-amount">
            <label for="cards-count">Set amount of cards</label>
            <input id="cards-count" type="number" min="4" max="22" step="2" value="12">
        </div>
        `;
        document.querySelector('body').insertAdjacentHTML('afterbegin', html);
    }

    public renderSameCardsInput(): void {
        const html = `
        <div class="same-cards">
            <label>Find <input id="same-cards-input" type="number" min="2" max="4" step="1" value="2"> same cards.</label>
        </div>
        `;

        document.querySelector('body').insertAdjacentHTML('afterbegin', html);
    }

    public renderTimerProgressBar(): void {
        const html = `
        <div class='time-progressbar-wrapper'>
            <div class='time-progress'></div>
        </div>
        `;

        document.querySelector('body').insertAdjacentHTML("afterbegin", html);
    }
}