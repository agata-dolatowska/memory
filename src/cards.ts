import Card from "./card";
import { imageNames } from "./imageNames";

export default class Cards {
    private selectedImagesIds: number[] = [];
    private imagesCount = imageNames.length;
    public cardsList: Card[] = [];
    public cardCount: number;

    constructor(cardCount: number) {
        this.cardCount = cardCount;
    }

    public createCards() {
        this.renderEmptyCards();
        this.selectRandomImages();
        this.createCardElements();
    }

    private renderEmptyCards(): void {
        let html: string = '';

        for (let cardIndex = 0; cardIndex < this.cardCount; cardIndex++) {
            html += `<div id=${cardIndex} class='card'></div>`;
        }

        document.querySelector('.board').insertAdjacentHTML("afterbegin", html);
    }

    private selectRandomImages(): void {
        const uniqueCardsCount: number = this.cardCount / 2;
        let currentNumber: number = 0;

        for (let i = 0; this.selectedImagesIds.length < uniqueCardsCount; i++) {
            currentNumber = Math.floor(Math.random() * this.imagesCount);
            if (!this.selectedImagesIds.includes(currentNumber)) {
                this.selectedImagesIds.push(currentNumber);
            }
        }
    }

    private createCardElements() {
        let currentNumber: number = 0;
        let allIdsTwice: number[] = [...this.selectedImagesIds, ...this.selectedImagesIds];
        let idCounter: number = 0;

        for (let i = 0; this.cardsList.length < this.cardCount; i++) {
            currentNumber = Math.floor(Math.random() * allIdsTwice.length);

            if (this.cardOccurredLessThanTwice(imageNames[allIdsTwice[currentNumber]])) {
                this.cardsList.push(
                    new Card(imageNames[allIdsTwice[currentNumber]], idCounter)
                );
                allIdsTwice.splice(currentNumber, 1);
                idCounter++;
            }
        }
    }

    private cardOccurredLessThanTwice(currentImageSrc: string): boolean {
        const cardOccurrences = this.cardsList.filter(card => card.imageSrc == `${currentImageSrc}`);
        if (cardOccurrences.length < 2) {
            return true;
        }
        else {
            return false;
        }
    }
}