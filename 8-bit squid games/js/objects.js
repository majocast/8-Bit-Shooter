function PlayerBullet(x, y, angle, direction) {
  //Bullet variables
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.direction = direction;
  this.xspeed = 0;
  this.yspeed = 0;
  this.width = 8;
  this.height = 4;
  this.active = true;

  this.step = function() {
    //movement
    if(this.active) {
      if (direction == "right") {
        this.xspeed = 50;
      } else if (direction == "left") {
        this.xspeed = -50;
      }

      this.x += this.xspeed;
    }
  }

  this.draw = function() {
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
