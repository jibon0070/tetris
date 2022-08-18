import { Entity } from "./Entity.js";
import { Game } from "./Game.js";
import Vector2 from "./Vector2.js";

export default class UI implements Entity {
    update(delta_time: number): void {
    }
    draw(): void {
        if (this.game.state !== 'playing') {
            this.game.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.game.ctx.fillRect(0, 0, this.game.ctx.canvas.width, this.game.ctx.canvas.height);
            this.game.ctx.fillStyle = 'white';
            this.game.ctx.font = '20px Arial';
            // vertical alignment center
            this.game.ctx.textBaseline = 'middle';
            // horizontal alignment center
            this.game.ctx.textAlign = 'center';
            if (this.game.state == 'paused') {
                this.game.ctx.fillText(`Paused \n Press 'Space' to resume`, this.game.ctx.canvas.width / 2, this.game.ctx.canvas.height / 2);
            }else if (this.game.state == 'game_over') {
                this.game.ctx.fillText(`Game Over \n Press 'Space' to restart`, this.game.ctx.canvas.width / 2, this.game.ctx.canvas.height / 2);
            }
        }
    }
    position!: Vector2;
    velocity!: Vector2;
    constructor(private readonly game: Game) { }

}