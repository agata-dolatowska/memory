export default class Card {
    public id: number;
    public imageSrc: string;
    public isFacingUp: boolean;
    public pairFound: boolean;

    constructor(imageSrc: string, id: number, isFacingUp: boolean = false, pairFound: boolean = false) {
        this.imageSrc = imageSrc;
        this.id = id;
        this.isFacingUp = isFacingUp;
        this.pairFound = pairFound;
    }
}