import { Game } from "./Game.js";
import Vector2 from "./Vector2.js";

export interface Entity {
    update(delta_time: number): void;
    draw(): void;
    position: Vector2;
    velocity: Vector2;
}