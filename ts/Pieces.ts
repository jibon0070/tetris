import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
import Vector2 from "./Vector2.js";

class Piece implements Entity {
    protected matrix!: number[][]
    protected color!: string;
    postion!: Vector2;
    private last_moved: number = 0;
    private movement_speed: number = 1000;
    constructor(private readonly game: Game) {
        this.velocity = new Vector2(0, game.grid_size);
    }
    protected calculate_start_position(game: Game) {
        this.position = new Vector2(
            game.ctx.canvas.width / 2 -
            (game.grid_size * this.matrix[0].length / 2), 0);
    }

    update(delta_time: number): void {
        // this.position.add(this.velocity);

        this.movement_update(delta_time);
    }
    movement_update(delta_time: number) {
        this.last_moved += delta_time;
        if (this.last_moved > this.movement_speed) {
            this.last_moved = 0;
            this.position.add(this.velocity);
            this.game.check_for_collision();
        }
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
    position!: Vector2;
    velocity!: Vector2;
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
        this.calculate_start_position(game);
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
        this.calculate_start_position(game);
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
        this.calculate_start_position(game);
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
        this.calculate_start_position(game);
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
        this.calculate_start_position(game);
    }
}

export class ZPiece extends Piece {
    constructor(game: Game) {
        super(game);
        this.matrix = [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0],
        ];
        this.color = 'purple';
        this.calculate_start_position(game);
    }
}

export class SPiece extends Piece {
    constructor(game: Game) {
        super(game);
        this.matrix = [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0],
        ];
        this.color = 'pink';
        this.calculate_start_position(game);
    }
}

