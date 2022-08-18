import Config from "./Config.js";
import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
import Vector2 from "./Vector2.js";

export default class Score implements Entity {
    score: number = 0;
    high_score: number = localStorage.getItem(Config.high_score_key) ? parseInt(localStorage.getItem(Config.high_score_key)!) : 0;
    update(delta_time: number): void {
    }
    draw(): void {
        this.game.ctx.font = "16px Arial";
        this.game.ctx.fillStyle = "white";
        //text-align right
        this.game.ctx.textAlign = "right";
        //hori-align top
        this.game.ctx.textBaseline = "top";
        this.game.ctx.fillText(`Score: ${this.score}`, this.game.ctx.canvas.width - 10, 10);
        this.game.ctx.fillText(`High Score: ${this.high_score}`, this.game.ctx.canvas.width - 10, 16 + 16);
    }
    constructor(private readonly game: Game) {
    }
    position!: Vector2;
    velocity!: Vector2;
    add(number: number): void {
        this.score += number;
        if (this.score > this.high_score) {
            this.high_score = this.score;
            localStorage.setItem(Config.high_score_key, this.high_score.toString());
        }
    }
}