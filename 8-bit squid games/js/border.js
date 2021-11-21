//border blue is the floor
//border red is walls
//border purple is the portals where enemies s

function Border (x, y, width, height, type) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.type = type;

  this.draw = function() {
    if(this.type === 1) {
      context.fillStyle = "#9B7653";
    } else if (this.type === 2) {
      context.fillStyle = "red";
    } 
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
