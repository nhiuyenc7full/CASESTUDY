class Drop {
    constructor(image, x, y, width, height, name) {
      this.name = name;
      this.image = image;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.basket = basket;
      this.speed = 5;
    }

    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    moveDown() {
      this.y += this.speed;
    }
}