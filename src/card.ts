export default class Card{
    public id:number;
    public imageSrc:string;
    public isFacingUp:boolean = false;
    public pairFound:boolean = false;

    constructor(imageSrc:string, id:number){
        this.imageSrc = imageSrc;
        this.id=id;
    }
}