import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
import Vector2 from "./Vector2.js";

export default class Board implements Entity {
    update(delta_time: number): void {
    }
    draw(): void {
        this.matrix.map((row, y) => {
            row.map((value, x) => {
                this.game.ctx.fillStyle = value;
                this.game.ctx.fillRect(x * this.game.grid_size, y * this.game.grid_size, this.game.grid_size, this.game.grid_size);
                //2px border
                this.game.ctx.strokeStyle = 'gray';
                this.game.ctx.strokeRect(x * this.game.grid_size, y * this.game.grid_size, this.game.grid_size, this.game.grid_size);
            })
        })
    }

    matrix: string[][] = [];

    constructor(private readonly game: Game) {
        this.create_board(game);
    }
    position!: Vector2;
    velocity!: Vector2;


    private create_board(game: Game) {
        for (let x = 0; x < this.game.board_rows; x++) {
            const row = [];
            for (let y = 0; y < game.board_columns; y++) {
                row.push('black');
            }
            this.matrix.push(row);
        }
    }
}