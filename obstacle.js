class Obstacle{
    constructor(x, y, w, h, c){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }

    show(){
        push();
        image(this.c, this.x, this.y, this.w, this.h);
        pop();
        this.x -= vx;
        this.y -= vy;
    }
}