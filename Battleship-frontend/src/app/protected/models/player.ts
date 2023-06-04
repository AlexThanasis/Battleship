import { Ship } from './ship';

export class Player {
    private name: string;
    private score: number;
    private ships: Array<Ship>;
    private isNext: boolean;

    constructor(name: string) {
        this.name = name;
        this.score = 0;
        this.ships = [];
        this.isNext = false;
    }
    
    public getName() : string {
        return this.name;
    }

    public setScore(change: number): void {
        this.score += change;
    }
    
    public getScore(): number {
        return this.score;
    }

    public setShip(ship: Ship): void {
        this.ships.push(ship);
    }

    public getShips(): Ship[] {
        return this.ships;
    }

    public getIsNext(): boolean {
        return this.isNext;
    }

    public toggleIsNext(): void {
        this.isNext != this.isNext;
    }
}