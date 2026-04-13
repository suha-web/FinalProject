let canvasW = 3000;
let canvasH = 3000; //creates canvas larger then the window

let offsetX = 0;
let offsetY = 0; //shift or displacement in a value or position used for the drag

let scaleFactor = 1; //current zoom level
let minScale = 0.5;
let maxScale = 3; //Min and Max zoom 

let dragging = false; //whether the mouse is currently dragging
let lastMouseX, lastMouseY; //last mouse position

let img, img2; //two images

function preload() {
  img = loadImage("Drawing.png"); 
  img2 = loadImage("Drawing2.png"); //loads the images
}

function setup() {
  createCanvas(windowWidth, windowHeight); //creates the canvas

  offsetX = (width - canvasW) / 2;
  offsetY = (height - canvasH) / 2; //centered the canvas
}

function draw() {
  background(30);
  fill(60);
  rect(0, 0, canvasW, canvasH);

  push(); //saves the currenet settinings 

  translate(offsetX, offsetY); // moves the world
  scale(scaleFactor); //applies the zoom


  let img1Size = 500; //first image size
  if (img) {
    imageMode(CENTER);
    image(img, canvasW / 2, canvasH / 2, img1Size, img1Size);
  } //centers the image

  if (img2) {
    imageMode(CENTER);
    image(img2, canvasW / 2, canvasH / 2, img1Size * 0.4, img1Size * 0.4);
  } //centers the image

}

function mouseWheel(event) {
  let zoomSpeed = 0.001; //controls the zoom speed

  let oldScale = scaleFactor; //restore the original zoom
  scaleFactor -= event.delta * zoomSpeed; // adjust the zoom based on zoom direction
  scaleFactor = constrain(scaleFactor, minScale, maxScale); //keeps zoom within limits

  let scaleChange = scaleFactor / oldScale; //calculates how much zoom 

 
  offsetX -= (mouseX - offsetX) * (scaleChange - 1);
  offsetY -= (mouseY - offsetY) * (scaleChange - 1); //zoom towards the mouse cursor

 
}


function mousePressed() {
  dragging = true;
  lastMouseX = mouseX;
  lastMouseY = mouseY; //starts dragining and stores mouse position
}

function mouseReleased() {
  dragging = false; //stops draginig
}

function mouseDragged() {
  if (dragging) { //Only move if dragging
    let dx = mouseX - lastMouseX;
    let dy = mouseY - lastMouseY; //how much the mouse has moved 

    offsetX += dx;
    offsetY += dy; //move by that amount

    lastMouseX = mouseX;
    lastMouseY = mouseY; //update mouse position

    constrainPan(); //scale contraint on the drag
  }
}

function constrainPan() {
  let scaledW = canvasW * scaleFactor;
  let scaledH = canvasH * scaleFactor;

  let minX = width - scaledW;
  let minY = height - scaledH;

  offsetX = constrain(offsetX, minX, 0);
  offsetY = constrain(offsetY, minY, 0); // prevents dragginig of the edge and zooming of the edge
}

 