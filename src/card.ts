export default class Card{
    public id:number;
    public imageSrc:string;
    public isFacingUp:boolean = false;

    constructor(imageSrc:string){
        this.imageSrc = `${imageSrc}`;
    }
}