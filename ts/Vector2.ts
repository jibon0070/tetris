export default class Vector2{
    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }
    add(velocity: Vector2) {
        this.x += velocity.x;
        this.y += velocity.y;
    }
    constructor(public x: number, public y: number){}
}