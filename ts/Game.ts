import Board from "./Board.js";
import { Entity } from "./Entity.js";
import Input from "./Input.js";
import Piece, { IPiece, OPiece, LPiece, TPiece, JPiece, ZPiece, SPiece } from "./Pieces.js";
import Score from "./Score.js";
import UI from "./UI.js";

export class Game {
    private board!: Board;
    readonly input: Input;
    score!: Score;
    state: string = 'paused';
    ui!: UI;
    check_for_collision() {
        if (this.collides) {
            this.current_piece.position.y -= this.grid_size;
            this.merge();
            this.check_for_score();
            let index = this.entities.indexOf(this.current_piece);
            this.entities.splice(index, 1);
            if(this.check_for_game_over) return;
            this.current_piece = this.get_random_piece;
            this.entities.push(this.current_piece);
            // this.entities = [this.board, this.current_piece];
        }
    }
    private get check_for_game_over():boolean {
        for (let i = 0; i < this.board.matrix[3].length; i++) {
            if (this.board.matrix[3][i] !== 'black') {
                this.state = 'game_over';
                return true;
            }
        }
        return false;
    }

    check_for_score() {
        let row_count = 0;
        this.board.matrix = this.board.matrix.filter((row) => {
            if (!row.includes('black')) {
                row_count++;
                return false;
            }
            return true;
        })
        let matrix: string[][] = [];
        for (let i = 0; i < row_count; i++) {
            matrix.push(Array(this.board_columns).fill('black'));
        }
        this.board.matrix = matrix.concat(this.board.matrix);
        this.score.add(row_count);
    }
    private canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    readonly board_rows = 20;
    readonly board_columns = 12;
    private readonly info_rows = 20;
    private readonly info_columns = 4;
    private readonly total_columns = this.board_columns + this.info_columns;
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
        const cr = this.total_columns / this.board_rows;
        const sr = innerWidth / innerHeight;
        if (cr < sr) {
            this.grid_size = Math.floor(innerHeight / this.board_rows);
            this.canvas.height = this.grid_size * this.board_rows;
            this.canvas.width = this.grid_size * this.total_columns;
        } else {
            this.grid_size = Math.floor(innerWidth / this.total_columns);
            this.canvas.width = this.grid_size * this.total_columns;
            this.canvas.height = this.grid_size * this.board_rows;
        }
    }

    update(delta_time: number) {
        this.global_input();
        if (this.state !== 'playing') return;
        this.entities.map(entity => entity.update(delta_time));
    }
    global_input() {
        //space
        if (this.input.keys.has(' ') && this.state === 'playing') {
            this.state = 'paused';
            this.input.keys.delete(' ');
        } else if (this.input.keys.has(' ') && this.state === 'paused') {
            this.state = 'playing';
            this.input.keys.delete(' ');
        } else if (this.input.keys.has(' ') && this.state === 'game_over') {
            this.state = 'playing';
            this.input.keys.delete(' ');
            this.init();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.entities.map(entity => entity.draw());
    }

    private init() {
        this.board = new Board(this);
        this.current_piece = this.get_random_piece;
        this.score = new Score(this)
        this.ui = new UI(this);
        this.entities = [this.board, this.score, this.current_piece, this.ui];
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
        for (let y = 0; y < m.length; y++) {
            for (let x = 0; x < m[y].length; x++) {
                try {
                    if (m[y][x] !== 0 && this.board.matrix[y + o.y / this.grid_size][x + o.x / this.grid_size] !== 'black') {
                        return true;
                    }
                } catch (e) {
                    return true;
                }
            }
        }
        return false;
    }
}