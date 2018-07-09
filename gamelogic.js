var snake_head_x;
var snake_head_y;
var snake_head_direction;
var grid; 
var wall_x;
var wall_y;
var snakeLength;
var snakeBody;
var scores;
var level;
var reverseDir;

var bombs = [];
var blowingbombs = [];
var blownbombs = [];
var fuseTime = 75;
var blowTime = 5;
var explosionTime = 2;
var tickCount = 0;

function initGame(num_p, size_x, size_y)
{
    var num_players = num_players;
	wall_x = size_x;
	wall_y = size_y;
	grid = new Array(size_x);
	scores = new Array(num_p);
	scores[0] = 0;
	
	for(i = 0; i < size_x; i++) {
		grid[i]=new Array(size_y);
	}
	
	initBoard();
		
	level = 0;
	initSnake();
}

function initBoard() {
	for (var y=0; y<wall_y; y++) {
		for (var x=0; x<wall_x; x++) {
			if (x > 1 && x < wall_x-2 && y > 1 && y < wall_y-2) {
				 if (Math.random() < 0.05) {
					grid[x][y] = 'mushroom';
				}
				else {
					grid[x][y] = null;
				}
			}
			else {
				grid[x][y] = null;
			}
		}
	}
}

function initSnake() {
	snakeBody = [];
	var dir = Math.random();
	if (dir < 0.25) {
		snake_head_direction = 'down';
		snake_head_x = Math.floor(Math.random()*wall_x-2)+1;
		snake_head_y = 0;
	}
	else if (dir < 0.5) {
		snake_head_direction = 'left';
		snake_head_x = wall_x-1;
		snake_head_y = Math.floor(Math.random()*wall_y-2)+1;
	}
	else if (dir <0.75) {
		snake_head_direction = 'right';
		snake_head_x = 0;
		snake_head_y = Math.floor(Math.random()*wall_y-2)+1;
	}
	else {
		snake_head_direction = 'up';
		snake_head_x = Math.floor(Math.random()*wall_x-2)+1;
		snake_head_y = wall_y-1;
	}
	level++;
	reverseDir = !reverseDir;
	snakeLength = 30-(level*2);
	initBoard();
}

function tick()
{
    tickCount++;
}

function playSound(soundfile){
var sound_effect = new Audio();
sound_effect.src = soundfile;
sound_effect.play();
} 

function getCurrentBoard()
{
	snakeBody.push([snake_head_x, snake_head_y]);
	
	switch(snake_head_direction)
	{
		case 'down':
		
			if(snake_head_y + 1 >= wall_y || grid[snake_head_x][snake_head_y + 1] == 'mushroom')
			{
				if (reverseDir) {
					snake_head_direction = 'left';
				}
				else {
					snake_head_direction = 'right';
				}
				playSound("snake_hiss.wav");
				
			}
			else
			{
				if (checkWin(snake_head_x, snake_head_y + 1)) return grid;
				grid[snake_head_x][snake_head_y] = 'snake_body';
				snake_head_y++;
                grid[snake_head_x][snake_head_y] = 'snake_head';
			}
			break;
		

		case 'up':
		
			if(snake_head_y - 1 < 0 || grid[snake_head_x][snake_head_y - 1] == 'mushroom')
			{
				if (reverseDir) {
					snake_head_direction = 'right';
				}
				else {
					snake_head_direction = 'left';
				}
				playSound("snake_hiss.wav");
			}
			else
			{
				if (checkWin(snake_head_x, snake_head_y - 1)) return grid;
				grid[snake_head_x][snake_head_y] = 'snake_body';
				snake_head_y--;
				grid[snake_head_x][snake_head_y] = 'snake_head';
			}
			break;		
		

		case 'right':
		
			if(snake_head_x + 1 >= wall_x || grid[snake_head_x + 1][snake_head_y] == 'mushroom')
			{
				if (reverseDir) {
					snake_head_direction = 'down';
				}
				else {
					snake_head_direction = 'up';
				}
				playSound("snake_hiss.wav");
			}
			else
			{
				if (checkWin(snake_head_x + 1, snake_head_y)) return grid;
				grid[snake_head_x][snake_head_y] = 'snake_body';
				snake_head_x++;
				grid[snake_head_x][snake_head_y] = 'snake_head';
			}
			break;		
		
			
		case 'left':
		
			if(snake_head_x - 1 < 0 || grid[snake_head_x - 1][snake_head_y] == 'mushroom')
			{
				if (reverseDir) {
					snake_head_direction = 'up';
				}
				else {
					snake_head_direction = 'down';
				}
				playSound("snake_hiss.wav");
			}
			else
			{
				if (checkWin(snake_head_x - 1, snake_head_y)) return grid;
				grid[snake_head_x][snake_head_y] = 'snake_body';
				snake_head_x--;
				grid[snake_head_x][snake_head_y] = 'snake_head';
			}
			break;		
	}
	
	if (snakeBody.length > snakeLength) {
		var itemToRemove = snakeBody.shift();
		grid[itemToRemove[0]][itemToRemove[1]] = null;
		grid[snakeBody[0][0]][snakeBody[0][1]] = 'snake_tail';
	}
	
	return grid;
}

function checkWin(x, y) {
	if (grid[x][y] == 'snake_body' || grid[x][y] == 'snake_tail') {
		// remove snake from grid
		var score;
		for (var i=0; i<snakeBody.length; i++) {
			grid[snakeBody[i][0]][snakeBody[i][1]] = null;
			if (snakeBody[i][0] == x && snakeBody[i][1] == y) {
				playSound("levelup.wav");
				score = (snakeBody.length-i)*100;
			}
		}
		scores[0] += score;
		var scoreTxt = document.getElementById("scoreTxt");
        if(scoreTxt != null)
		    scoreTxt.value = scores[0]+" ";
		if (level == 13) {
			playSound("win.wav");
			alert("Level "+level+" Score: "+score+"\nHighScore: "+scores[0]);
			level = 0;
			scores[0] = 0;
            if(scoreTxt != null)
			    scoreTxt.value = scores[0]+" ";
		}
		else {
			//scores[0] += score;
			alert("Level "+level+" Score: "+score);
		}
        clearLevel();
		initSnake();
		return true;
	}
	return false;
}

function clearLevel()
{
    if(bombs != null && bombs.length > 0)
    {
        for (var i=0; i<bombs.length; i++)
        {
            grid[bombs[i].x][bombs[i].y] = null;

        }
        bombs.splice(0,bombs.length);
    }

    if(blowingbombs != null && blowingbombs.length > 0)
    {
        for (var i=0; i<blowingbombs.length; i++)
        {
            grid[blowingbombs[i].x][blowingbombs[i].y] = null;

        }
        blowingbombs.splice(0,blowingbombs.length);
    }

    if(blownbombs != null && blownbombs.length > 0)
    {
        for (var i=0; i<blownbombs.length; i++)
        {
            grid[blownbombs[i].x][blownbombs[i].y] = null;

        }
        blownbombs.splice(0,blownbombs.length);
    }
}

function checkDie(x,y)
{
    if (grid[x][y] == 'snake_head' || grid[x][y] == 'snake_body' || grid[x][y] == 'snake_tail')
    {
        // remove snake from grid
        alert('Snake Blows up!');
        for (var i=0; i<snakeBody.length; i++)
        {
            grid[snakeBody[i][0]][snakeBody[i][1]] = null;
        }

        if (level == 13) {
            //alert("Level "+level+" Score: "+score+"\nHighScore: "+scores[0]);
            level = 0;
        }
        else {

            //alert("Level "+level+" You died ");
        }
        clearLevel();
        initSnake();
        return true;
    }
    return false;
}

function processBombs()
{
    //These bombs still are on there fuse, are black
    for(var i = 0;i < bombs.length;i++)
    {
        var t = bombs[i].t;
		
        //alert('x' + bombs[i].x + ' y ' + bombs[i].y + ' t ' + bombs[i].t);
        // alert('processBombs: ' + tickCount + ' - ' + 't: ' + t + ' == ' + fuseTime);
        if(tickCount - t == fuseTime)
        {
            var x = bombs[i].x;
            var y = bombs[i].y;
            //alert('Bomb went off');
            grid[x][y] = 'bombred';
            //remove bomb from list
            bombs.splice(i,1);
            blowingbombs.push({'x':x,'y':y,'t':tickCount});
        }
    }

    //These bombs are now about to blow, are red
    for(var i = 0;i < blowingbombs.length;i++)
    {
        var t = blowingbombs[i].t;
        if(tickCount - t == blowTime)
        {
            var x = blowingbombs[i].x;
            var y = blowingbombs[i].y;
            //alert('Bomb went off');
            grid[x][y] = 'fuse';
            //remove bomb from list
            blowingbombs.splice(i,1);
            blownbombs.push({'x':x,'y':y,'t':tickCount});
        }
    }

    //This is for bombs blowing up
    for(var i = 0;i < blownbombs.length;i++)
    {
        var t = blownbombs[i].t;
        if(tickCount - t == explosionTime)
        {
            var x = blownbombs[i].x;
            var y = blownbombs[i].y;
            //alert('Bomb went off');
            grid[x][y] = null;
            //remove bomb from list
            blowingbombs.splice(i,1);

            //remove mushrooms from vicinity
            //Ensure not testing 2D array out of bounds
            var top = false;
            var left = false;
            var bottom = false;
            var right = false;

            if(x == 0)
            {
                top = true;
            }
            else if(x == wall_x -1)
            {
                bottom = true;
            }
            if(y == 0)
            {
                left = true;
            }
            else if(y == wall_y -1)
            {
                right = true;
            }

            checkDie(x,y);

            if(!top )
            {
                //top left
                if(!left)
                {
                    if(grid[x-1][y-1] == 'mushroom')
                    {
                        grid[x-1][y-1] = null;
                    }
                    else
                    {
                        checkDie(x-1,y-1);
                    }
                }
                //top
                if(grid[x-1][y] == 'mushroom')
                {
                    grid[x-1][y] = null;
                }
                else
                {
                    checkDie(x-1,y);
                }
                //top right
                if(!right)
                {
                    if(grid[x-1][y+1] == 'mushroom')
                    {
                        grid[x-1][y+1] = null;
                    }
                    else
                    {
                        checkDie(x-1,y+1);
                    }
                }
            }

            //left
            if(!left)
            {
                if(grid[x][y-1] == 'mushroom')
                {
                    grid[x][y-1] = null;
                }
                else
                {
                    checkDie(x,y-1);
                }
            }
            //right
            if(!right)
            {
                if(grid[x][y+1] == 'mushroom')
                {
                    grid[x][y+1] = null;
                }
                else
                {
                    checkDie(x,y+1);
                }
            }

            if(!bottom)
            {
                //bottom left
                if(!left)
                {
                    if(grid[x+1][y-1] == 'mushroom')
                    {
                        grid[x+1][y-1] = null;
                    }
                    else
                    {
                        checkDie(x+1,y-1);
                    }
                }
                //bottom
                if(grid[x+1][y] == 'mushroom')
                {
                    grid[x+1][y] = null;
                }
                else
                {
                    checkDie(x+1,y);
                }
                //bottom right
                if(!right)
                {
                    if(grid[x+1][y+1] == 'mushroom')
                    {
                        grid[x+1][y+1] = null;
                    }
                    else
                    {
                        checkDie(x+1,y+1);
                    }
                }
            }
            //kill snake if on or bordering bomb

        }
    }

}

function placeSomething(player, thing, x, y)
{	
	if (grid[x][y] != null) {
		return;
	}

	 if(thing == 'mushroom') {
		
		var mushroom = thing;
		grid[x][y] = mushroom;
			
	 }else if(thing == 'bomb') {
		 var bomb = thing;
		 grid[x][y] = bomb;

         var _t = tickCount;
         //alert('push t:' + _t);
         bombs.push({'x':x,'y':y,'t':_t});
	 }
}

function getScore(player)
{
	return scores[player];
}

function getInventory()
{

	
	
}
