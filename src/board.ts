export default class Board {
    public cardCount: number = 12;

    public createBoard() {
        this.renderBoard();
        this.renderEmptyCards();
    }

    private renderBoard(): void {
        const html: string = `<div class='board'></div>`;
        document.querySelector('body').insertAdjacentHTML("afterbegin", html);
    }

    public renderEmptyCards(): void {
        let html: string = '';

        for (let x = 0; x < this.cardCount; x++) {
            html += `<div id=${x} class='card'></div>`;
        }

        document.querySelector('.board').insertAdjacentHTML("afterbegin", html);
    }
}