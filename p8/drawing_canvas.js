
class Shape {
  constructor(col, sw) {
    this.l = [];
    this.col = col;
    this.w = sw;
  }

  getColor() {
    return this.col;
  }

  getStrokeWeight() {
    return this.w;
  }

  addPoint(point) {
    this.l.push(point);
  }

  get(i) {
    return this.l[i];
  }

  len() {
    return this.l.length;
  }
}

class ShapeSet {
  constructor() {
    this.l = [];
  }

  add(shape) {
    this.l.push(shape);
  }

  removeLast() {
    this.l.splice(this.l.length - 1, 1);
  }

  get(i) {
    return this.l[i];
  }

  len() {
    return this.l.length;
  }

}

class DrawingCanvas {

  constructor(location, dimension) {
    this.loc = location;
    this.dim = dimension;

    this.canvas = createGraphics(this.dim.x, this.dim.y);

    this.shapeSet = new ShapeSet();
  }

  newPoint(p) {
    let new_point = createVector(p.x - this.loc.x, p.y - this.loc.y);
    if(new_point.x < 0 || new_point.y < 0) return;
    if(new_point.x > width || new_point.y > height) return;
    if(this.shapeSet.len() == 0) {
      this.shapeSet.add(new Shape(current_line_color));
    }
    this.shapeSet.get(this.shapeSet.len() - 1).addPoint(new_point);
  }

  newShape(p) {
    this.shapeSet.add(new Shape(current_line_color, current_line_stroke_weight));
    this.shapeSet.get(this.shapeSet.len() - 1).addPoint(p);
  }

  undo() {
    this.shapeSet.removeLast();
    print(this.shapeSet.len());
  }

  update() {
    var p;
    var prev_p;

    this.canvas.background(current_back_color);

    // for every shape
    for(let i = 0; i < this.shapeSet.len(); i++) {
      var s = this.shapeSet.get(i);
      this.canvas.stroke(s.getColor());
      this.canvas.strokeWeight(s.getStrokeWeight());

      // for every point
      for(let j = 2; j < s.len(); j++) {
        p = s.get(j);
        prev_p = s.get(j-1);

        this.canvas.line(p.x, p.y,
                         prev_p.x, prev_p.y);
      }
    }

    image(this.canvas, this.loc.x, this.loc.y);
  }

}
