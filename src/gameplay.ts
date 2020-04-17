import Card from './card';

export default class Gameplay{
    private playerMoves:number = 0;
    private cards:Card[] = [];

    constructor(cards:Card[]){
        this.cards=cards;
        this.addClickEventToCards();
    }

    private addClickEventToCards():void{
        let allCards = document.getElementsByClassName('card');

        for (let x = 0; x < allCards.length; x++) {
            allCards[x].addEventListener('click', e=>this.manageCardsVisibility(e), false);
        }
    }

    private manageCardsVisibility(e:Event):void{
        const clickedCardId:number = parseInt((e.target as Element).id);
        let facingUpCards=this.cards.filter(card=>card.isFacingUp==true);

        this.hideVisibleCards(facingUpCards);

        this.showCard(clickedCardId);
        facingUpCards=this.cards.filter(card=>card.isFacingUp==true);

        if(facingUpCards.length==2){
            this.checkIfFoundPair(facingUpCards);
        }
    }

    private showCard(clickedCardId:number):void{
        if(this.cards[clickedCardId].pairFound == false){
            this.cards[clickedCardId].isFacingUp = true;

            const html= `<img src='${this.cards[clickedCardId].imageSrc}' id='card${clickedCardId}'>`;

            document.querySelector(`[id='${clickedCardId}']`).insertAdjacentHTML('afterbegin',html);
        }
    }

    private checkIfFoundPair(x:Card[]):void{
        const facingUpCards = x;

        if(facingUpCards[0].imageSrc==facingUpCards[1].imageSrc){
            console.log("para!!!");

            for(let x=0; x<facingUpCards.length; x++){
                this.cards[facingUpCards[x].id].isFacingUp=false;
                this.cards[facingUpCards[x].id].pairFound=true;
                document.querySelector(`[id='${facingUpCards[x].id}']`).classList.add('pair-found');
            }
        }
    }

    private hideVisibleCards(x:Card[]):void{
        const facingUpCards = x;
        if(facingUpCards.length==2){
        for(let x=0; x<facingUpCards.length; x++){
            document.querySelector(`#card${this.cards[facingUpCards[x].id].id}`).remove();
            this.cards[facingUpCards[x].id].isFacingUp=false;
        }
        }
    }
}