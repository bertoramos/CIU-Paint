

var dc, dlcs, dbcs, lss, li;
var lcp, bcp;

var current_line_color;
var current_line_stroke_weight;
var current_back_color;

function setup() {
  createCanvas(800, 600);

  background(200);

  current_line_color = color(255, 0, 0);
  current_line_stroke = 1;
  current_back_color = color(100);

  dc = new DrawingCanvas(createVector(0, 65), createVector(800, 500));

  dlcs = new DefaultLineColorSelector(createVector(5,5), createVector(4, 1), 25, 2,
                                      [[color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0)]]);



  dbcs = new DefaultBackgroundColorSelector(createVector(5,35), createVector(4, 1), 25, 2,
                                            [[color(255, 255, 255), color(100, 100, 100), color(0, 0, 100), color(100, 100, 0)]]);


  lcp = new LineColorPicker(createVector(width - 100, 5));
  bcp = new BackgroundColorPicker(createVector(width - 100, 35));


  current_line_stroke_weight = 1;
  lss = new LineStrokeSelector(createVector(width/2, 10), 1, 20);
  li = new UserInfo(createVector(3*width/4, 10));



  text("Line", 150, 25);
  text("Background", 150, 50);

  textSize(10);
  text("Undo : Z", 520, 50);

  text("Pick", 670, 25);
  text("Pick", 670, 50);

  stroke(0);
  strokeWeight(0.25);
  for(let i = 230; i <= 360; i+=5) {
    point(i, 20);
    point(i, 45);
  }


}

function draw() {
  dc.update();
  li.update();
}

function mouseDragged() {
  if(mouseButton == LEFT) dc.newPoint(createVector(mouseX, mouseY));
}

function mousePressed() {
  if(mouseButton == LEFT) dc.newShape(createVector(mouseX, mouseY));
}

function keyPressed() {
  if(key.toLowerCase() == 'z') dc.undo();
}
