let food = new Image();
let imgBasket = new Image();

let id = 1;
food.src = document.getElementById(id).src;
imgBasket.src = document.getElementById("basket").src;
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

const SCREAN_CANVAS = {
  SCREAN_WIDTH : c.width,
  SCREAN_HEIGHT : c.height
} 

let xDrop = 20;
let yDrop = 0;
let wDrop = 60;
let hDrop = 60;

let myReq;

let xBasket = 150;
let wBasket = 100;
let hBasket = 50;
let yBasket = 550;

let score = 0;
let life = 3;

let basket = new Basket(
  imgBasket,
  xBasket,
  yBasket,
  wBasket,
  hBasket,
  "basket"
);

let drop = new Drop(food, xDrop, yDrop, wDrop, hDrop, "drop");

function move(evt) {
  switch (evt.keyCode) {
    case 37:
      if (basket.x >= 0) {
        basket.moveLeft();
      }
      break;
    case 39:
        if (basket.x <= SCREAN_CANVAS.SCREAN_WIDTH - basket.width) {
      basket.moveRight();
    }
      break;
  }
}

window.addEventListener("keydown", move);


const performAnimation = () => {
  myReq = requestAnimationFrame(performAnimation);
  ctx.clearRect(0, 0, SCREAN_CANVAS.SCREAN_WIDTH, SCREAN_CANVAS.SCREAN_HEIGHT);
  basket.draw(ctx);
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  
  if (drop.y <= c.height - 10) {
    drop.draw(ctx);
    drop.moveDown();
  } else {
    drop.y = 0;
    drop.x = Math.floor(Math.random() * (c.width - wDrop));
    id = Math.floor(Math.random() * 7) + 1;
  }
    food.src = document.getElementById(id).src;
    
    if ( (id <= 6) && 
    ( drop.y >= basket.y ) && 
    ( drop.x + drop.width >= basket.x ) && 
    ( drop.x - drop.width) <= ( basket.x + basket.width )) {
      ctx.clearRect(0, 0, SCREAN_CANVAS.SCREAN_WIDTH, SCREAN_CANVAS.SCREAN_HEIGHT);
      basket.draw(ctx);

     if ( (id <= 6) && 
    ( drop.y === basket.y ) && 
    ( drop.x + drop.width >= basket.x ) && 
    ( drop.x - drop.width) <= ( basket.x + basket.width )) {
      score++;
    };
    
    if ( (id <= 6) && 
    ( drop.y > basket.y ) && 
    ( drop.x + drop.width >= basket.x ) && 
    ( drop.x - drop.width) <= ( basket.x + basket.width ))
    ctx.clearRect(0, 0, SCREAN_CANVAS.SCREAN_WIDTH, SCREAN_CANVAS.SCREAN_HEIGHT);
    ctx.fillText("+1", drop.x, basket.y);
    basket.draw(ctx);
    };

    if (((id <= 6) && (drop.y === basket.y) && (drop.x + drop.width < basket.x)) ||
     ((id <= 6) && (drop.y === basket.y) && (drop.x) > (basket.x + basket.width))) {
      life--;
    };
    if (((id <= 6) && (drop.y > basket.y) && (drop.x + drop.width < basket.x)) ||
     ((id <= 6) && (drop.y > basket.y) && (drop.x) > (basket.x + basket.width))) {
      ctx.clearRect(0, 0, SCREAN_CANVAS.SCREAN_WIDTH, SCREAN_CANVAS.SCREAN_HEIGHT);
      ctx.fillText("-life", drop.x, basket.y);
      basket.draw(ctx);
    };


    if ((id === 7) && 
    (drop.y === basket.y) && 
    (drop.x + drop.width >= basket.x) && 
    (drop.x) <= (basket.x + basket.width)) {
      life--;
    }
    if ((id === 7) && 
    (drop.y > basket.y) && 
    (drop.x + drop.width >= basket.x) && 
    (drop.x) <= (basket.x + basket.width)) {
      ctx.clearRect(0, 0, SCREAN_CANVAS.SCREAN_WIDTH, SCREAN_CANVAS.SCREAN_HEIGHT);
      ctx.fillText("-life", drop.x, basket.y);
      basket.draw(ctx);
    };


    if (((id === 7) && (drop.y >= basket.y) && (drop.x + drop.width < basket.x)) ||
    ((id === 7) && (drop.y >= basket.y) && (drop.x) > (basket.x + basket.width))) {
     ctx.clearRect(0, 0, SCREAN_CANVAS.SCREAN_WIDTH, SCREAN_CANVAS.SCREAN_HEIGHT);
       ctx.fillText("Good!", drop.x, basket.y);
       basket.draw(ctx);
   };

    if (score === 10) drop.speed = 10;

    if (life === 0) {
      cancelAnimationFrame(myReq);
      ctx.clearRect(0, 0, SCREAN_CANVAS.SCREAN_WIDTH, SCREAN_CANVAS.SCREAN_HEIGHT);
      ctx.fillText("GAME OVER", 110, 320);
    }
      ctx.fillText("Life: " + life, 300, 50);
      ctx.fillText("Score: " + score, 10, 50);

}

requestAnimationFrame(performAnimation);