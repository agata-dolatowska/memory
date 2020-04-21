export default class Board {

    public renderBoard(): void {
        const html: string = `<div class='board'></div>`;
        document.querySelector('body').insertAdjacentHTML("afterbegin", html);
    }
}