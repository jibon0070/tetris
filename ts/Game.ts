import Board from "./Board.js";
import { Entity } from "./Entity.js";
import { IPiece, OPiece, LPiece, TPiece, JPiece, ZPiece, SPiece } from "./Pieces.js";

export class Game {
    board!: Board;
    check_for_collision() {
        console.log('checking for collision');
    }
    private canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    readonly row = 20;
    readonly columns = 10;
    grid_size!: number;
    private current_piece!: Entity;
    entities: Entity[] = [];
    get get_random_piece(): Entity {
        const pieces = [IPiece, OPiece, LPiece, TPiece, JPiece, ZPiece, SPiece];
        return new pieces[Math.floor(Math.random() * pieces.length)](this);
    }


    constructor() {
        this.canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
        this.ctx = this.canvas.getContext('2d')!;
        this.resize();
        window.onresize = () => this.resize();
        this.init();
    }
    resize() {
        this.grid_size = innerHeight < innerWidth ?
            Math.floor(innerHeight / this.row) :
            Math.floor(innerWidth / this.columns);
        this.canvas.width = this.columns * this.grid_size;
        this.canvas.height = this.row * this.grid_size;
    }

    update(delta_time: number) {
        this.entities.map(entity => entity.update(delta_time));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.entities.map(entity => entity.draw());
    }

    init() {
        this.board = new Board(this);
        this.current_piece = this.get_random_piece;
        this.entities = [this.board, this.current_piece];
    }
}