// JavaScript Document

// backend calls
// placeSomething(player, thing, x, y)
// getCurrentBoard():doubleArray
// getScore(player):score
// getInventory(player):array
// initGame(numPlayers, sizeX, sizeY)
var is_chrome = false;

var gridWith = 20;
var gridHeight = 20;
var gridPosX = 60;
var gridPosY = 80;
var gridSize = 32;

var canvas_pos_top = 403;
var canvas_pos_left = 20;

//var MUSHROOM = 1;
var MUSHROOM = "mushroom";
//var BOMB = 2;
var BOMB = "bomb";
var BOMBRED = "bombred";
var FUSE = 'fuse';
//var SNAKE_HEAD = 10;
var SNAKE_HEAD = "snake_head";
//var SNAKE_BODY = 11;
var SNAKE_BODY = "snake_body";
//var SNAKE_TAIL = 12;
var SNAKE_TAIL = "snake_tail";

var SELECTED_THING = MUSHROOM



function checkSupported() {
	canvas = document.getElementById('canvas');
    is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if (canvas.getContext) {
		//Screen setup goes here
		ctx = canvas.getContext('2d');
		//Mushroom Arrayl, -1's are just for init and debug, remove later or fill from file/level data
		//this.mushrooms = [{'x':-1,'y':-1}]
		//this.mushrooms = [];
//		//How far to test a point for collision
//		this.collisionDist = 10;
//		//How far to test for if the snake eats itself
//		this.eatRange = 1;
//		//Snakes head position
//		this.headPosition = {'x':50, 'y':50};
//		//body secgment size
//		this.segmentSize = 10;
//		//snake's body
//		this.snakeBody = [];
//		//snake's length
//		this.snakeLength = 20;
//		
//		this.direction = 'right';
		
		initGame(1, gridWith, gridHeight);
		
		setInterval(updateGame, 100);
	} else {
		// Canvas is not supported
		alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
	}
}

function updateGame() {
    tick();
	var board = getCurrentBoard();
	var gameTile = new Image();
	gameTile.src = "tile.jpg";
	var mushroom = new Image();
    mushroom.src = "mushroom.png";
    var bomb = new Image();
    bomb.src = "bomb.png";
    var bombred = new Image();
    bombred.src = "bombred.png";
    var fuse = new Image();
    fuse.src = "fuse.png";
	var snake_head = new Image();
	snake_head.src = "snake_head.png";
	var snake_body = new Image();
	snake_body.src = "snake_body.png";
	var snake_tail = new Image();
	snake_tail.src = "snake_tail.png";
	for (var y=0; y<gridHeight; y++) {
		for (var x=0; x<gridWith; x++) {
			ctx.drawImage(gameTile, gridPosX+x*gridSize, gridPosY+y*gridSize, gridSize, gridSize);
			if (board[x][y] == MUSHROOM) {
				ctx.drawImage(mushroom, gridPosX+x*gridSize, gridPosY+y*gridSize, gridSize, gridSize);
			}
            else if(board[x][y] == BOMB)
            {
                ctx.drawImage(bomb, gridPosX+x*gridSize, gridPosY+y*gridSize, gridSize, gridSize);
            }
            else if(board[x][y] == BOMBRED)
            {
                ctx.drawImage(bombred, gridPosX+x*gridSize, gridPosY+y*gridSize, gridSize, gridSize);
            }
            else if(board[x][y] == FUSE)
            {
                ctx.drawImage(fuse, gridPosX+x*gridSize, gridPosY+y*gridSize, gridSize, gridSize);
            }
			else if (board[x][y] == SNAKE_HEAD) {
				ctx.drawImage(snake_head, gridPosX+x*gridSize, gridPosY+y*gridSize, gridSize, gridSize);
			}
			else if (board[x][y] == SNAKE_BODY) {
				ctx.drawImage(snake_body, gridPosX+x*gridSize, gridPosY+y*gridSize, gridSize, gridSize);
			}
			else if (board[x][y] == SNAKE_TAIL) {
				ctx.drawImage(snake_tail, gridPosX+x*gridSize, gridPosY+y*gridSize, gridSize, gridSize);
			}
		}
	}

    //process bombs in gamelogic
    processBombs();
}

function init() {
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", getPosition, false);
	playSound("theme.wav", 'y');
}

function playSound(soundfile, checkloop){
var sound_effect = new Audio();
sound_effect.src = soundfile;
/* if(checkloop == 'y')
{
	sound_effect.addEventListener('ended', function() { 
		this.currentTime = 0;
        this.play();
    }, false);
	//sound_effect.loop = true;
} */
sound_effect.play();

	
}


function getPosition(event) {
  	var x = new Number();
	var y = new Number();
	var canvas = document.getElementById("canvas");

    if(is_chrome)
    {
        x = event.pageX;
        y = event.pageY;
    }
    else if (event.x != undefined && event.y != undefined)
	{
	  x = event.x;
	  y = event.y;
	}
    else // Firefox method to get the position
	{
	  x = event.clientX + document.body.scrollLeft +
		  document.documentElement.scrollLeft;
	  y = event.clientY + document.body.scrollTop +
		  document.documentElement.scrollTop;
	}

    x -= canvas.offsetLeft + canvas_pos_left;
    y -= canvas.offsetTop + canvas_pos_top;
	
	// translate mouse x,y into grid x.y
	if (x >= gridPosX && x < gridPosX+gridWith*gridSize && y >= gridHeight && y < gridPosY+gridHeight*gridSize) {
		x = Math.floor((x - gridPosX) / gridSize);
		y = Math.floor((y - gridPosY) / gridSize);
		
		playSound("mushroom.wav", 'n');
		placeSomething(0, SELECTED_THING, x, y);
	}
    else
    {
        //
    }


}

function inventoryClick(thing)
{

	playSound("button_click.wav", 'n');
    //alert(thing + " clicked");
    switch(thing)
    {
        case 'shroom':
            SELECTED_THING = MUSHROOM;
            break;
        case 'bomb':
            SELECTED_THING = BOMB;
            break;
    }
}


