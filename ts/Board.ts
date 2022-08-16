import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
import Vector2 from "./Vector2.js";

export default class Board implements Entity {
    update(delta_time: number): void {
    }
    draw(): void {
        this.matrix.map((row, y) => {
            row.map((value, x) => {
                this.game.ctx.fillStyle = typeof value === 'number' ? 'black' : value;
                this.game.ctx.fillRect(x * this.game.grid_size, y * this.game.grid_size, this.game.grid_size, this.game.grid_size);
                //2px border
                this.game.ctx.strokeStyle = 'gray';
                this.game.ctx.strokeRect(x * this.game.grid_size, y * this.game.grid_size, this.game.grid_size, this.game.grid_size);
            })
        })
    }

    matrix: (number | string)[][] = [];

    constructor(private readonly game: Game) {
        this.create_board(game);
    }
    position!: Vector2;
    velocity!: Vector2;


    private create_board(game: Game) {
        for (let x = 0; x < this.game.row; x++) {
            const row = [];
            for (let y = 0; y < game.columns; y++) {
                row.push(0);
            }
            this.matrix.push(row);
        }
        console.log(this.matrix);
    }
}