// JavaScript Document

// backend calls
// placeSomething(player, thing, x, y)
// getCurrentBoard():doubleArray
// getScore(player):score
// getInventory(player):array
// initGame(numPlayers, sizeX, sizeY)

//var MUSHROOM = 1;
var MUSHROOM = "mushroom";
//var BOMB = 2;
var BOMB = "bomb";
//var SNAKE_HEAD = 10;
var SNAKE_HEAD = "snake_head";
//var SNAKE_BODY = 11;
var SNAKE_BODY = "snake_body";
//var SNAKE_TAIL = 12;
var SNAKE_TAIL = "snake_tail";

var board;

function initGame(numPlayers, sizeX, sizeY) {
	board = new Array(sizeY);
	for (i=0; i <sizeY; i++) {
		board[i] = new Array(sizeX);
	}
	for (var x=0; x<sizeX; x++) {
		for (var y=0; y<sizeY; y++) {
			if (Math.random() < 0.08 && x != 12) {
				board[x][y] = MUSHROOM;
			}
		}
	}
	board[12][5] = SNAKE_TAIL;
	board[12][6] = SNAKE_BODY;
	board[12][7] = SNAKE_BODY;
	board[12][8] = SNAKE_BODY;
	board[12][9] = SNAKE_BODY;
	board[12][10] = SNAKE_BODY;
	board[12][11] = SNAKE_BODY;
	board[12][12] = SNAKE_BODY;
	board[12][13] = SNAKE_BODY;
	board[12][14] = SNAKE_BODY;
	board[12][15] = SNAKE_BODY;
	board[12][16] = SNAKE_HEAD;
}

function getCurrentBoard() {
	return board;
}

function placeSomething(player, thing, x, y) {
	board[x][y] = thing;
}

function getInventory(player) {
	return [MUSHROOM, MUSHROOM, MUSHROOM, BOMB, BOMB, null, null, null, null, null];
}

function getScore(player) {
	return 456;
}

