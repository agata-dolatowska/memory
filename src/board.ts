import Card from './card';
import {imageNames} from './imageNames';

export default class Board{
    private cardCount: number = 12;
    public cards:Card[] = [];
    private imagesCount = imageNames.length;
    private selectedImagesIds:number[]=[];

    public createBoard(){
        this.renderBoard();
        // this.selectRandomImages();
        this.selectedImagesIds=[0,1,2,3,4,5];
        this.renderEmptyCards();
        this.createCards();
    }

    private renderBoard():void{
        const html:string= `<div class='board'></div>`;
        document.querySelector('body').insertAdjacentHTML("afterbegin", html);
    }

    // private selectRandomImages():void{
    //     const uniqueCardsCount:number = this.cardCount/2;
    //     let currentNumber:number=0;

    //     for(let x=0; this.selectedImagesIds.length < uniqueCardsCount; x++){
    //         currentNumber = Math.floor(Math.random()*this.imagesCount);
    //         if(!this.selectedImagesIds.includes(currentNumber)){
    //             this.selectedImagesIds.push(currentNumber);
    //         }
    //     }
    // }

    private createCards(){
        let currentNumber:number = 0;
        let allIdsTwice:number[] = [...this.selectedImagesIds,...this.selectedImagesIds];
        let idCounter:number = 0;

        for(let x=0; this.cards.length<this.cardCount; x++){
            currentNumber = Math.floor(Math.random()*allIdsTwice.length);

            if(this.cardOccurredLessThanTwice(imageNames[allIdsTwice[currentNumber]])){
                this.cards.push(
                    new Card(imageNames[allIdsTwice[currentNumber]], idCounter)
                    );
                    allIdsTwice.splice(currentNumber,1);
                    idCounter++;
            }
        }
    }

    private cardOccurredLessThanTwice(x:string):boolean{
        const cardOccurrences = this.cards.filter(y=>y.imageSrc==`${x}`);
        if(cardOccurrences.length<2){
            return true;
        }
        else{
            return false;
        }
    }

    private renderEmptyCards():void{
        let html:string = '';

        for(let x=0; x<this.cardCount; x++){
            html+=`<div id=${x} class='card'></div>`;
        }

        document.querySelector('.board').insertAdjacentHTML("afterbegin", html);
    }


}