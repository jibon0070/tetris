export default class Vector2{
    add(velocity: Vector2) {
        this.x += velocity.x;
        this.y += velocity.y;
    }
    constructor(public x: number, public y: number){}
}