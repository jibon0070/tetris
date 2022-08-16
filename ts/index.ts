import {Game} from "./Game.js";

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    let last_update = 0;
    const game_loop = (time: number) => {
        const delta_time = time - last_update;
        last_update = time;
        game.update(delta_time);
        requestAnimationFrame(game_loop);
    }
    requestAnimationFrame(game_loop);
})