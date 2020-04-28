export default class Board {

    public renderBoard(): void {
        const html: string = `
        <div class="body-wrapper">
            <div class="app-wrapper">
                <form class='board-form'></form>
                <div class='time-progressbar-wrapper'></div>
                <div class='board'></div>
            </div>
        </div>
        `;
        document.querySelector('body').insertAdjacentHTML("afterbegin", html);
    }
}