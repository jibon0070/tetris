import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
import Vector2 from "./Vector2.js";

export default class Piece implements Entity {
    matrix!: number[][]
    color!: string;
    private last_droped: number = 0;
    private movement_speed: number = 1000;
    constructor(private readonly game: Game) {
        this.velocity = new Vector2(0, game.grid_size);
    }
    position!: Vector2;
    velocity: Vector2;
    calculate_start_position() {
        this.position = new Vector2(
            (this.game.board_columns * this.game.grid_size / 2) -
            (this.matrix[0].length * this.game.grid_size / 2) -
            (this.matrix[0].length % 2 * this.game.grid_size / 2),
            0
        );
    }

    update(delta_time: number): void {
        this.move();
        this.auto_drop(delta_time);
    }
    private rotate() {
        //rotate matrix clockwise
        this.matrix = this.matrix.map((row, y) => {
            return row.map((value, x) => {
                return this.matrix[x][y];
            }).reverse();
        })
    }
    private auto_drop(delta_time: number) {
        this.last_droped += delta_time;
        if (this.last_droped > this.movement_speed) {
            this.drop();
        }
    }
    private move() {
        if (this.game.input.keys.has('ArrowLeft')) {
            this.game.input.keys.delete('ArrowLeft');
            this.position.x -= this.game.grid_size;
            if (this.game.collides)
                this.position.x += this.game.grid_size;
            else
                this.last_droped = 0;

        } else if (this.game.input.keys.has('ArrowRight')) {
            this.game.input.keys.delete('ArrowRight');
            this.position.x += this.game.grid_size;
            if (this.game.collides)
                this.position.x -= this.game.grid_size;
            else
                this.last_droped = 0;
        } else if (this.game.input.keys.has('ArrowDown')) {
            this.game.input.keys.delete('ArrowDown');
            this.position.y += this.game.grid_size;
            if (this.game.collides)
                this.position.y -= this.game.grid_size;
            else
                this.last_droped = 0;
        } else if (this.game.input.keys.has('ArrowUp')) {
            this.last_droped = 0;
            this.game.input.keys.delete('ArrowUp');
            this.rotate();
        }
    }
    private drop() {
        this.last_droped = 0;
        this.position.add(this.velocity);
        this.game.check_for_collision();
    }

    draw(): void {
        this.matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    this.game.ctx.fillStyle = this.color;
                    this.game.ctx.fillRect(this.position.x + (x * this.game.grid_size), this.position.y + (y * this.game.grid_size), this.game.grid_size, this.game.grid_size);
                    //2px border
                    this.game.ctx.strokeStyle = 'gray';
                    this.game.ctx.strokeRect(this.position.x + (x * this.game.grid_size), this.position.y + (y * this.game.grid_size), this.game.grid_size, this.game.grid_size);
                }
            })
        })
    }
}

export class IPiece extends Piece {
    constructor(game: Game) {
        super(game);
        this.matrix = [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ];
        this.color = 'red';
        this.calculate_start_position();
    }
}

export class OPiece extends Piece {
    constructor(game: Game) {
        super(game);
        this.matrix = [
            [1, 1],
            [1, 1],
        ];
        this.color = 'blue';
        this.calculate_start_position();
    }
}

export class LPiece extends Piece {
    constructor(game: Game) {
        super(game);
        this.matrix = [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ];
        this.color = 'green';
        this.calculate_start_position();
    }
}

export class TPiece extends Piece {
    constructor(game: Game) {
        super(game);
        this.matrix = [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
        this.color = 'yellow';
        this.calculate_start_position();
    }
}

export class JPiece extends Piece {
    constructor(game: Game) {
        super(game);
        this.matrix = [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0],
        ];
        this.color = 'orange';
        this.calculate_start_position();
    }
}

export class ZPiece extends Piece {
    constructor(game: Game) {
        super(game);
        this.matrix = [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1],
        ];
        this.color = 'purple';
        this.calculate_start_position();
    }
}

export class SPiece extends Piece {
    constructor(game: Game) {
        super(game);
        this.matrix = [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0],
        ];
        this.color = 'pink';
        this.calculate_start_position();
    }
}

