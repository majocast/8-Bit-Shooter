function Player(x, y) {
  //Player variables
  this.x = x;
  this.y = y;
  this.xspeed = 0;
  this.yspeed = 0;
  this.friction = 0.9;
  this.jumping = true;
  this.maxSpeed = 20;
  this.width = 25;
  this.height = 50;
  this.active = true;
  this.direction = "right";

  this.step = function() {
    //Movement
    if(this.active) {
      //horizontal Movement
      if(!leftKey && !rightKey || leftKey && rightKey) {
        //slow down
        this.xspeed *= this.friction;
      } else if (rightKey) {
        //move right
        this.xspeed++;
        this.direction = "right";
      } else if (leftKey) {
        //move left
        this.xspeed--;
        this.direction = "left";
      }
      //vertical movement
      if (upKey && this.jumping == false) {
        //check if on ground
        this.yspeed -= 50;
        this.jumping = true;
      }
      //apply gravity
      this.yspeed += 1.5;

      if (shootKey) {
        if (this.direction == "right") {
          playerBullets.push(new PlayerBullet(this.x+this.width, this.y+17, 0, this.direction));
          bulletCounter++;
        } else if (this.direction == "left") {
          playerBullets.push(new PlayerBullet(this.x-10, this.y+17, 0, this.direction));
          bulletCounter++;
        }
      }

      //correct speed
      if(this.xspeed > this.maxSpeed) {
        this.xspeed = this.maxSpeed;
      } else if (this.xspeed < -this.maxSpeed) {
        this.xspeed = -this.maxSpeed;
      }
      if(this.yspeed > this.maxSpeed) {
        this.yspeed = this.maxSpeed;
      } else if (this.yspeed < -this.maxSpeed) {
        this.yspeed = -this.maxSpeed;
      }
      if (this.xspeed > 0) {
        this.xspeed = Math.floor(this.xspeed);
      } else {
        this.xspeed = Math.ceil(this.xspeed);
      }
      if (this.yspeed > 0) {
        this.yspeed = Math.floor(this.yspeed);
      } else {
        this.yspeed = Math.ceil(this.yspeed);
      }

      //horizontal collision Rect
      let horizontalRect = {
        x: this.x + this.xspeed,
        y: this.y,
        width: this.width,
        height: this.height,
      }
      //Vertical Collision Rect
      let verticalRect = {
        x: this.x,
        y: this.y + this.yspeed,
        width: this.width,
        height: this.height
      }

      //Check for intersections
      for (let i = 0; i < borders.length; i++) {
        let borderRect = {
          x: borders[i].x,
          y: borders[i].y,
          width: borders[i].width,
          height: borders[i].height
        }
        if (checkIntersection(horizontalRect, borderRect)) {
          while (checkIntersection(horizontalRect, borderRect)) {
            horizontalRect.x -= Math.sign(this.xspeed);
          }
          this.x = horizontalRect.x;
          this.xspeed = 0;
        }
        if (checkIntersection(verticalRect, borderRect)) {
          while (checkIntersection(verticalRect, borderRect)) {
            verticalRect.y -= Math.sign(this.yspeed);
          }
          this.y = verticalRect.y;
          this.yspeed = 0;
          this.jumping = false;
        }
      }

      //check for intersection with enemies
      for (let i = 0; i<enemies.length; i++) {
        let enemyRect = {
          x: enemies[i].x,
          y: enemies[i].y,
          width: enemies[i].width,
          height: enemies[i].height
        }
        if (checkIntersection(horizontalRect, enemyRect)) {
          this.active = false;
          mode = 2;
        }
        if (checkIntersection(verticalRect, enemyRect)) {
          this.active = false;
          mode = 2;
        }
      }

      if(this.x < 0) {
        this.x = 1280;
      } else if (this.x > 1280) {
        this.x = -1;
      }

      this.x += this.xspeed;
      this.y += this.yspeed;
    }
  }

  this.draw = function() {
    context.fillStyle = "green";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  this.dead = function() {
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
