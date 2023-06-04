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