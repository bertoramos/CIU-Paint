class DefaultLineColorSelector {
  constructor(loc, matrix_shape, button_size, pad, matrix_colors) {
    this.buttons = [];

    let handler_creator = function(c) {
      return function() {
        current_line_color = c;
      }
    }

    for (let i = 0; i < matrix_shape.x; i++) {
      for (let j = 0; j < matrix_shape.y; j++) {
        let bt = createButton("");
        bt.position(loc.x + i * (button_size + pad), loc.y + j * (button_size + pad));
        bt.size(button_size, button_size);
        bt.style("background-color", matrix_colors[j][i]);

        let c = matrix_colors[j][i];
        bt.value = c;
        bt.mousePressed(handler_creator(c));
      }
    }
  }

}

class DefaultBackgroundColorSelector {
  constructor(loc, matrix_shape, button_size, pad, matrix_colors) {
    this.buttons = [];

    let handler_creator = function(c) {
      return function() {
        current_back_color = c;
      }
    }

    for (let i = 0; i < matrix_shape.x; i++) {
      for (let j = 0; j < matrix_shape.y; j++) {
        let bt = createButton("");
        bt.position(loc.x + i * (button_size + pad), loc.y + j * (button_size + pad));
        bt.size(button_size, button_size);
        bt.style("background-color", matrix_colors[j][i]);

        let c = matrix_colors[j][i];
        bt.value = c;
        bt.mousePressed(handler_creator(c));
      }
    }
  }

}

class LineColorPicker {
  constructor(loc) {
    let cp = createColorPicker(current_line_color);
    cp.position(loc.x, loc.y);
    cp.input(function() {
      current_line_color = cp.color();
    });
  }
}

class BackgroundColorPicker {
  constructor(loc) {
    let cp = createColorPicker(current_back_color);
    cp.position(loc.x, loc.y);
    cp.input(function() {
      current_back_color = cp.color();
    });
  }
}

class LineStrokeSelector {

  constructor(loc, min, max) {
    let s = createSlider(min, max, current_line_stroke_weight, 1);
    s.position(loc.x, loc.y);

    s.input(function() {
      current_line_stroke_weight = s.value();
    });
  }
}

class UserInfo {
  constructor(loc) {
    this.loc = loc;
  }

  update() {
    let canvas = createGraphics(40, 40);
    canvas.background(current_back_color);
    canvas.stroke(0);
    canvas.stroke(current_line_color);
    canvas.strokeWeight(current_line_stroke_weight);
    canvas.line(5, canvas.height / 2, canvas.width - 5, canvas.height / 2);
    image(canvas, this.loc.x, this.loc.y);
  }
}