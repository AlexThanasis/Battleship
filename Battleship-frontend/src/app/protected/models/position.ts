import { TypeOfPlayerBoardElement, TypeOfOpponentBoardElement } from "./TypeOfObject";

export class Position {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    public getPos() {
        return [this.x, this.y];
    }

    public getXPos() {
        return this.x;
    }

    public getYPos() {
        return this.y;
    }
}

export class ShipPosition extends Position {
    private isHit: boolean;

    constructor(x: number, y: number, isHit: boolean = false) {
        super(x, y);
        this.isHit = isHit;
    }

    public getShipPos(): any {
        return [super.getXPos(), super.getYPos(), this.isHit];
    }

    public setIsHit(): void {
        this.isHit = true;
    }
}

export class PlayerGameBoardPosition extends Position {
    private elementType: TypeOfPlayerBoardElement;

    constructor(x: number, y: number, elementType = TypeOfPlayerBoardElement.Water) {
        super(x, y);
        this.elementType = elementType;
    }

    public getShipPos(): any {
        return [super.getXPos(), super.getYPos(), this.elementType];
    }

    public setIsHit(): void {
        if (this.elementType === TypeOfPlayerBoardElement.Ship) {
            this.elementType = TypeOfPlayerBoardElement.HitShip;
        } else {
            this.elementType = TypeOfPlayerBoardElement.HitEmpty;
        }
    }
}

export class OpponentGameBoardPosition extends Position {
    private elementType: TypeOfOpponentBoardElement;
    private isShip: boolean;

    constructor(x: number, y: number, isShip: boolean, elementType = TypeOfOpponentBoardElement.Unknown) {
        super(x, y);
        this.elementType = elementType;
        this.isShip = isShip;
    }

    public getShipPos(): any {
        return [super.getXPos(), super.getYPos(), this.elementType];
    }

    public setIsHit(): void {
        if (this.isShip) {
            this.elementType = TypeOfOpponentBoardElement.HitShip;
        } else {
            this.elementType = TypeOfOpponentBoardElement.HitEmpty;
        }
    }
}