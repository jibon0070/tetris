import Board from "./Board.js";
import { Entity } from "./Entity.js";
import Input from "./Input.js";
import Piece, { IPiece, OPiece, LPiece, TPiece, JPiece, ZPiece, SPiece } from "./Pieces.js";

export class Game {
    private board!: Board;
    readonly input: Input;
    check_for_collision() {
        if (this.collides) {
            this.current_piece.position.y -= this.grid_size;
            this.merge();
            this.current_piece = this.get_random_piece;
            this.entities = [this.board, this.current_piece];
        }
    }
    private canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    readonly row = 20;
    readonly columns = 12;
    grid_size!: number;
    private current_piece!: Piece;
    private entities: Entity[] = [];
    private get get_random_piece(): Piece {
        const pieces = [IPiece, OPiece, LPiece, TPiece, JPiece, ZPiece, SPiece];
        return new pieces[Math.floor(Math.random() * pieces.length)](this);
        // return new pieces[7](this);
    }


    constructor() {
        this.canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
        this.ctx = this.canvas.getContext('2d')!;
        this.resize();
        window.onresize = () => this.resize();
        this.input = new Input(this);
        this.init();
    }
    private resize() {
        const cr = this.columns / this.row;
        const sr = innerWidth / innerHeight;
        if (cr < sr) {
            this.grid_size = Math.floor(innerHeight / this.row);
            this.canvas.height = this.grid_size * this.row;
            this.canvas.width = this.grid_size * this.columns;
        } else {
            this.grid_size = Math.floor(innerWidth / this.columns);
            this.canvas.width = this.grid_size * this.columns;
            this.canvas.height = this.grid_size * this.row;
        }
    }

    update(delta_time: number) {
        this.entities.map(entity => entity.update(delta_time));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.entities.map(entity => entity.draw());
    }

    private init() {
        this.board = new Board(this);
        this.current_piece = this.get_random_piece;
        this.entities = [this.board, this.current_piece];
    }

    private merge() {
        this.current_piece.matrix.map((row, y) => {
            row.map((value, x) => {
                if (value !== 0) {
                    this.board.matrix[y + this.current_piece.position.y / this.grid_size][x + this.current_piece.position.x / this.grid_size] = this.current_piece.color;
                }
            })
        })
    }

    get collides(): boolean {
        const [m, o] = [this.current_piece.matrix, this.current_piece.position.clone()];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                try{
                    if (m[y][x] !== 0 && this.board.matrix[y + o.y / this.grid_size][x + o.x / this.grid_size] !== 0) {
                        return true;
                    }
                }catch(e){
                    return true;
                }
            }
        }
        return false;
    }
}