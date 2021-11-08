// define the piece class
class Piece {
    
    constructor(xPosition, yPosition, rowNumber, columnNumber) {
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.rowNumber = rowNumber;
        this.columnNumber = columnNumber;
        this.width = image.width/columns;
        this.height = image.height/rows;
    }

    draw() {
        context.drawImage(
            image,
            (image.width/columns)*this.columnNumber,
            (image.height/rows)*this.rowNumber, 
            (image.width/columns),
            (image.height/rows),
            this.xPosition,
            this.yPosition,
            this.width,
            this.height
        );
    }
}

// setup the canvas
let canvas = document.body.appendChild(
    document.createElement("canvas")
);
context = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

// load the image
let image = new Image();
image.src = "puzzleimage.jpg";

let mouseIsDown = "false";
let clickedPiece = {};
let mousePosition = {};
let rows = 4;
let columns = 4;
let pieces = [];

image.onload = function () {
    //generate the piece objects at random positions
    for(let rowNumber = 0; rowNumber < rows; rowNumber++) {
        for (let columnNumber = 0; columnNumber < columns; columnNumber++) {
            pieces.push(new Piece(
                Math.random()*canvas.width*0.8,
                Math.random()*canvas.height*0.8,
                rowNumber,
                columnNumber)
            );
        }
    }

    // draw the pieces 60 times per second
    setInterval(function() {

        context.clearRect(0,0,canvas.width,canvas.height);
        for(let piece of pieces)
            piece.draw();

        if(clickedPiece != undefined) {
            clickedPiece.xPosition = mousePosition.x;
            clickedPiece.yPosition = mousePosition.y;
        }

    }, 1000/60);
}

// update the mouse position
canvas.addEventListener("mousemove", function (event) {
    var rect = canvas.getBoundingClientRect();
    mousePosition = {
      x: event.clientX - rect.left, // account for border size
      y: event.clientY - rect.top
    };
});

// 
canvas.addEventListener("mousedown", function (event) {

    if(!mouseIsDown) {
        for(let piece of pieces) {
            if(
                piece.xPosition < mousePosition.x && 
                piece.yPosition < mousePosition.y &&
                piece.xPosition + piece.width > mousePosition.x &&
                piece.yPosition + piece.height > mousePosition.y
            ) 
            {
                clickedPiece = piece;
            }
        }
        mouseIsDown = true;
    }
});

canvas.addEventListener("mouseup", function (event) {
    mouseIsDown = false;
    clickedPiece = undefined;
});

document.addEventListener("mouseup", function (event) {
    mouseIsDown = false;
    clickedPiece = undefined;
});

