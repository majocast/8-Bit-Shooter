function Enemy(x,y) {
  this.x = x;
  this.y = y;
  this.health = 100;
  this.xspeed = 0;
  this.yspeed = 0;
  this.direction = "right";
  this.friction = 0.6;
  this.maxSpeed = 10;
  this.width = 25;
  this.height = 50;
  this.shoot = true;
  this.chase = true;
  this.active = true;

  this.step = function() {
    if(this.active) {
      //Movement
      if(player.x >= this.x) {
        //moves enemy to the right
        this.xspeed++;
      } else if (player.x <= this.x) {
        //moves enemy to the left
        this.xspeed--;
      }

      //decide orientation
      if (player.x > this.x) {
        this.direction = "right";
      } else if (player.x < this.x) {
        this.direction = "left";
      }


      this.yspeed += 1.5;

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
        height: this.height
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
        }
      }

      //check if hit by player bullet
      for (let i=0; i < playerBullets.length; i++) {
        let bulletRect = {
          x: playerBullets[i].x,
          y: playerBullets[i].y,
          width: playerBullets[i].width,
          height: playerBullets[i].height
        }
        if(checkIntersection(horizontalRect, bulletRect)) {
          this.health -= 25;
          if(player.x >= this.x) {
            //moves enemy to the right
            this.x -= 17;
          } else if (player.x <= this.x) {
            //moves enemy to the left
            this.x += 17;
          }
          playerBullets.splice(playerBullets[i], 1);
        }
        if(checkIntersection(verticalRect, bulletRect)) {
          this.health -= 25;
          if(player.x >= this.x) {
            //moves enemy to the right
            this.x -= 12;
          } else if (player.x <= this.x) {
            //moves enemy to the left
            this.x += 12;
          }
          playerBullets.splice(playerBullets[i], 1);
        }
      }

      this.x += this.xspeed;
      this.y += this.yspeed;
    }
  }
  this.draw = function() {
    context.fillStyle = "#e75480";
    context.fillRect(this.x, this.y, this.width, this.height);
    let img = new Image();
    img.onload = function() {
      context.drawImage(img, this.x, this.y, this.width, this.height);
    };
    img.src = '../theSnail.png';
  }
}
