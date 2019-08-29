class Basket {
    constructor(image, x, y, width, height, name) {
      this.name = name;
      this.image = image;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = 40;
    }
  
    draw(ctxBasket) {
      // ctxBasket.clearRect(0, 0, c.width, c.height);
      ctxBasket.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    moveLeft() {
        this.x -= this.speed;
    }
    moveRight() {
        this.x += this.speed;
    }
}