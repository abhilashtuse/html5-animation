var controller_img_path = 'img/wlan-controller.png',
    switch_img_path = 'img/switch.jpg',
    laptop_img_path = 'img/laptop.jpg',
    cellphone_img_path = 'img/cellphone.jpg',
    cloud_img_path = 'img/cloud.png',
    ap_img_path = 'img/access-point.jpg';

//Foreground
var canvas1 = document.getElementById("canvas1");
var ctx = canvas1.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
//Background
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");
ctx2.canvas.width  = window.innerWidth;
ctx2.canvas.height = window.innerHeight;
// set starting values
var fps = 60;
var percent = 0
var direction = 1;
var paused = true;

// draw canvas1
canvas2.addEventListener('click', showCoords, false);
addDevices();
drawPath();
animateButton.onclick = function (e) {
   paused = paused ? false : true;
   if (paused) {
      animateButton.value = 'Start';
   }
   else {
      window.requestNextAnimationFrame(animate);
      animateButton.value = 'Pause';
   }
};

function animate() {
    // set the animation position (0-100)
    if (!paused) {
        percent += direction;
        if (percent < 0) {
            percent = 0;
            direction = 1;
        };
        if (percent > 100) {
            percent = 100;
            direction = -1;
        };

        draw(percent);

        // request another frame
        setTimeout(function () {
            requestAnimationFrame(animate);
        }, 10000 / fps);
    }
}

function drawPath() {
  //Path : Cloud1 to Controller1
  ctx2.beginPath();
  ctx2.moveTo(120, 100);
  ctx2.lineTo(120, 157);
  ctx2.strokeStyle = 'black';
  ctx2.stroke();

  //Path : Cloud2 to Controller2
  ctx2.beginPath();
  ctx2.moveTo(570, 100);
  ctx2.lineTo(570, 157);
  ctx2.strokeStyle = 'black';
  ctx2.stroke();

  //Path1 : Laptop to AP
  ctx2.beginPath();
  ctx2.setLineDash([5, 5]);
  ctx2.moveTo(120, 550);
  ctx2.lineTo(350, 330);
  ctx2.strokeStyle = 'blue';
  ctx2.stroke();
  ctx2.setLineDash([0, 0]);

  // Path: AP to controller1
  ctx2.beginPath();
  ctx2.moveTo(300, 330);
  ctx2.lineTo(170, 185);
  ctx2.strokeStyle = 'blue';
  ctx2.stroke();

  //Path2 : mobile to AP
  ctx2.beginPath();
  ctx2.setLineDash([5, 5]);
  ctx2.moveTo(560, 550);
  ctx2.lineTo(350, 330);
  ctx2.strokeStyle = 'red';
  ctx2.stroke();
  ctx2.setLineDash([0, 0]);

  // Path: AP to controller2
  ctx2.beginPath();
  ctx2.moveTo(400, 330);
  ctx2.lineTo(500, 220);
  ctx2.strokeStyle = 'red';
  ctx2.stroke();
}

function showCoords(event) {
    var cX = event.clientX;
    var cY = event.clientY;
    var coords1 = "client - X: " + cX + ", Y coords: " + cY;
    console.log(coords1);
}
// draw the current frame based on sliderValue
function draw(sliderValue) {
    // redraw path
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx.lineWidth = 3;

    // draw the tracking rectangle
    var xy1, percent, xy2, flag = 0;
    if (sliderValue < 15) {
        percent = sliderValue / 14;
        xy1 = getLineXYatPercent({ x: 120, y: 550}, {x: 270, y: 400}, percent);
        xy2 = getLineXYatPercent({ x: 550, y: 540}, {x: 470, y: 480}, percent);
        flag = 1;
    } else if (sliderValue < 30) {
        percent = (sliderValue - 15) / 14;
        xy1 = getLineXYatPercent({x: 300, y: 330}, {x: 170, y: 185}, percent);
        xy2 = getLineXYatPercent({ x: 400, y: 330}, {x: 500, y: 220}, percent);
        flag = 2;
    } else if (sliderValue < 45) {
        percent = (sliderValue - 30) / 14;
        xy1 = getLineXYatPercent({x: 120, y: 157}, {x: 120, y: 100}, percent);
        xy2 = getLineXYatPercent({ x: 570, y: 157}, {x: 570, y: 100}, percent);
        flag = 3;
    } else if (sliderValue < 60) {
         percent = (sliderValue - 45) / 14;
        xy1 = getLineXYatPercent({x: 120, y: 100}, {x: 120, y: 157}, percent);
        xy2 = getLineXYatPercent({ x: 570, y: 100}, {x: 570, y: 157}, percent);
        flag = 3;
    } else if (sliderValue < 75) {
         percent = (sliderValue - 60) / 14;
        xy1 = getLineXYatPercent({x: 170, y: 185}, {x: 300, y: 330}, percent);
        xy2 = getLineXYatPercent({ x: 500, y: 220}, {x: 400, y: 330}, percent);
        flag = 2;
    } else {
         percent = (sliderValue - 75) / 14;
        xy1 = getLineXYatPercent({x: 270, y: 400}, {x: 150, y: 510}, percent);
        xy2 = getLineXYatPercent({ x: 470, y: 480}, {x: 570, y: 560}, percent);
        flag = 1;
    }
    drawRect1(xy1, "blue", flag);
    drawRect2(xy2, "red", flag);
}

// draw tracking rect at xy
function drawRect1(point, color, flag) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (flag == 1) {
      ctx.rect(point.x - 10, point.y, 15, 10);
      //console.log(point.x, point.y);
      ctx.fillText("P1", point.x - 30, point.y  + 8);
      ctx.rect(point.x + 5, point.y - 24, 15, 10);
      ctx.fillText("P2", point.x - 15, point.y - 16);
      //ctx.rect(point.x + 25, point.y - 48, 15, 10);
      //ctx.fillText("P3", point.x + 5, point.y - 40);
    } else if (flag == 2) {
      ctx.rect(point.x, point.y, 15, 10);
      ctx.fillText("P1", point.x - 20, point.y + 8);
      ctx.rect(point.x - 25, point.y - 24, 15, 10);
      ctx.fillText("P2", point.x - 50, point.y - 16);
      //ctx.rect(point.x - 50, point.y - 48, 15, 10);
      //ctx.fillText("P3", point.x - 75, point.y - 40);
    } else {
      ctx.rect(point.x - 10, point.y, 15, 10);
      ctx.fillText("P1", point.x - 30, point.y + 8);
      ctx.rect(point.x - 10, point.y - 24, 15, 10);
      ctx.fillText("P2", point.x - 30, point.y - 16);
      //ctx.rect(point.x - 10, point.y - 48, 15, 10);
      //ctx.fillText("P3", point.x - 30, point.y - 40);
    }
    ctx.fill();
    ctx.stroke();
}

// draw tracking rect at xy
function drawRect2(point, color, flag) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    // ctx.rect(point.x - 5, point.y - 5, 15, 5);
    // ctx.rect(point.x - 15, point.y - 15, 15, 5);
    // ctx.rect(point.x - 20, point.y - 20, 15, 5);
    // ctx.rect(point.x - 25, point.y - 25, 15, 5);
    if (flag == 1) {
      ctx.rect(point.x, point.y, 15, 10);
      ctx.fillText("P1", point.x - 20, point.y + 8);
      ctx.rect(point.x - 25, point.y - 25, 15, 10);
      ctx.fillText("P2", point.x - 45, point.y - 17);
      ctx.rect(point.x - 50, point.y - 50, 15, 10);
      ctx.fillText("P3", point.x - 70, point.y - 42);
    } else if (flag == 2) {
      ctx.rect(point.x - 10, point.y, 15, 10);
      ctx.fillText("P1", point.x + 10, point.y + 8);
      ctx.rect(point.x + 15, point.y - 24, 15, 10);
      ctx.fillText("P2", point.x + 40, point.y - 16);
      ctx.rect(point.x + 40, point.y - 48, 15, 10);
      ctx.fillText("P3", point.x + 65, point.y - 40);
    } else {
      ctx.rect(point.x - 10, point.y, 15, 10);
      ctx.fillText("P1", point.x - 30, point.y + 8);
      ctx.rect(point.x - 10, point.y - 24, 15, 10);
      ctx.fillText("P2", point.x - 30, point.y - 16);
      ctx.rect(point.x - 10, point.y - 48, 15, 10);
      ctx.fillText("P3", point.x - 30, point.y - 40);
    }
    ctx.fill();
    ctx.stroke();
}

// draw tracking dot at xy
function drawDot(point, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 8, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// line: percent is 0-1
function getLineXYatPercent(startPt, endPt, percent) {
    var dx = endPt.x - startPt.x;
    var dy = endPt.y - startPt.y;
    var X = startPt.x + dx * percent;
    var Y = startPt.y + dy * percent;
    return ({
        x: X,
        y: Y
    });
}

// quadratic bezier: percent is 0-1
function getQuadraticBezierXYatPercent(startPt, controlPt, endPt, percent) {
    var x = Math.pow(1 - percent, 2) * startPt.x + 2 * (1 - percent) * percent * controlPt.x + Math.pow(percent, 2) * endPt.x;
    var y = Math.pow(1 - percent, 2) * startPt.y + 2 * (1 - percent) * percent * controlPt.y + Math.pow(percent, 2) * endPt.y;
    return ({
        x: x,
        y: y
    });
}

// cubic bezier percent is 0-1
function getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, percent) {
    var x = CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
    var y = CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
    return ({
        x: x,
        y: y
    });
}

// cubic helper formula at percent distance
function CubicN(pct, a, b, c, d) {
    var t2 = pct * pct;
    var t3 = t2 * pct;
    return a + (-a * 3 + pct * (3 * a - a * pct)) * pct + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct + (c * 3 - c * 3 * pct) * t2 + d * t3;
}

function addDevices() {
    var cloud1_image = new Image();
    cloud1_image.onload = function() {
        ctx2.drawImage(cloud1_image, 50, 20);
    }
    cloud1_image.src = cloud_img_path;
    ctx2.font = "14pt Calibri";
    ctx2.fillStyle = 'blue';
    ctx2.fillText("AT & T Backbone", 5, 20);

    var cloud2_image = new Image();
    cloud2_image.onload = function() {
        ctx2.drawImage(cloud2_image, 500, 20);
    }
    ctx2.fillStyle = 'red';
    ctx2.fillText("Verizon Backbone", 450, 20);
    cloud2_image.src = cloud_img_path;

    var cntr1_image = new Image();
    cntr1_image.onload = function() {
        ctx2.drawImage(cntr1_image, 50, 157);
    }
    cntr1_image.src = controller_img_path;

    var cntr2_image = new Image();
    cntr2_image.onload = function() {
        ctx2.drawImage(cntr2_image, 500, 157);
    }
    cntr2_image.src = controller_img_path;

    var ap_image = new Image();
    ap_image.onload = function() {
        ctx2.drawImage(ap_image, 230, 330);
    }
    ap_image.src = ap_img_path;

    ctx2.fillStyle = 'blue';
    ctx2.fillText("AT & T", 180, 430);

    ctx2.fillStyle = 'red';
    ctx2.fillText("Verizon", 460, 430);

    ctx2.font = "20pt Calibri";
    ctx2.fillStyle = 'Green';
    ctx2.fillText("Intuitive Network Splicing", 220, 140);

    var laptop1_image = new Image();
    laptop1_image.onload = function() {
        ctx2.drawImage(laptop1_image, 0, 550);
    }

    laptop1_image.src = laptop_img_path;

    var cellphone_image = new Image();
    cellphone_image.onload = function() {
        ctx2.drawImage(cellphone_image, 580, 530);
    }
    cellphone_image.src = cellphone_img_path;
    ctx2.font = "8pt Calibri";
}
