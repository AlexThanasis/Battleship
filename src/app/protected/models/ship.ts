import { Position, ShipPosition } from "./position";
import { Player } from "./player";

export class Ship {
    private shipClass: string;
    private positions: ShipPosition[];

    constructor(shipClass: string, positions: ShipPosition[]) {
        this.shipClass = shipClass;
        this.positions = positions;
    }

    getPositions(): ShipPosition[] {
        return this.positions;
    }

    getHPRate(): number {
        return this.positions.filter(p => p.getShipPos()[2] === true).length / this.positions.length;
    }

    getHP(): number {
        return this.positions.filter(p => p.getShipPos()[2] === false).length;
    }

    getHit(fireOnPosition: Position): void {
        this.positions.filter(p => p.getShipPos()[0] === fireOnPosition.getXPos() && p.getShipPos()[1] === fireOnPosition.getYPos())[0].setIsHit();
        console.log("getHit");
    }

    public getShipClass(): string {
        return this.shipClass;
    }
}

export class Carrier extends Ship {
    constructor(positions: ShipPosition[]) {
        super("Carrier",positions);   
    }
}

export class Battleship extends Ship {
    constructor(positions: ShipPosition[]) {
        super("Battleship",positions);   
    }
}

export class Destroyer extends Ship {
    constructor(positions: ShipPosition[]) {
        super("Destroyer",positions);   
    }
}

export class Submarine extends Ship {
    constructor(positions: ShipPosition[]) {
        super("Submarine",positions);   
    }
}

export class PatrolBoat extends Ship {
    constructor(positions: ShipPosition[]) {
        super("Patrol Boat",positions);   
    }
}

