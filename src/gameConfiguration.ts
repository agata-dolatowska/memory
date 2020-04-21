export default class GameConfiguration {
    public cardsCount: number = 12;

    public renderCardAmountInput() {
        const html = `<div class="cards-amount">
            <label>Set amount of cards</label>
            <input id="cards-count" type="number" min="4" max="22" step="2" value="12">
        </div>
        `;
        document.querySelector('body').insertAdjacentHTML('afterbegin', html);
    }
}