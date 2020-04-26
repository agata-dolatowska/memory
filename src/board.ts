export default class Board {

    public renderBoard(): void {
        const html: string = `
        <div class="body-wrapper">
            <div class="app-wrapper">
                <div class='board'></div>
            </div>
        </div>
        `;
        document.querySelector('body').insertAdjacentHTML("afterbegin", html);
    }
}