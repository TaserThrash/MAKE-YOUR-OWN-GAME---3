class Island{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.w = 120;
        this.h = 20;
    }

    show(){
        push();
        fill("#12FF23");
        image(islandImg, this.x, this.y, this.w, this.h);
        pop();
        this.x -= vx;
        this.y -= vy;
    }
}