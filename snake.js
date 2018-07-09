function checkSupported() {
    canvas = document.getElementById('canvas');
   if (canvas.getContext){
	//Screen setup goes here
	ctx = canvas.getContext('2d');

	//Mushroom Arrayl, -1's are just for init and debug, remove later or fill from file/level data
	//this.mushrooms = [{'x':-1,'y':-1}]
	this.mushrooms = [];
	//How far to test a point for collision
	this.collisionDist = 10;
	//How far to test for if the snake eats itself
	this.eatRange = 1;
	
	//Snakes head position
	this.headPosition = {'x':50, 'y':50};
	//body secgment size
	this.segmentSize = 10;
	//snake's body
	this.snakeBody = [];
	//snake's length
	this.snakeLength = 20;
	
	this.direction = 'right';
	setInterval(moveSnake,100);
	
   } else {
     // Canvas is not supported
     alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
   }
}

 //init
function init()
{
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", getPosition, false);
}

//Snake eats itself
function clearSnake(segment)
{
   var score = (snakeLength + segment) * 10;
   //stops draw loop
   //clearInterval(interval);
   //clear snake body
   snakeBody = [];

   alert("Snake eaten. Your score was "+ score);
   
   //clear screen
   //ctx.clearRect(0,0, canvas.width, canvas.height);
}

//render snake, box now, add image later
 function drawSnake() {
   ctx.fillStyle = "rgb(200,0,0)";
   
   snakeBody.push([headPosition['x'], headPosition['y']]);
   ctx.fillRect(headPosition['x'], headPosition['y'], segmentSize, segmentSize);
   if (snakeBody.length > snakeLength) {
     var itemToRemove = snakeBody.shift();
     ctx.clearRect(itemToRemove[0], itemToRemove[1], segmentSize, segmentSize);
   }
   
   //TODO: This test isn't working well, it's hitting too much
   //It doesn't matter though since we are going to be using a grid for the board
   
    //Did I eat myself? don't start with head
    //for(segment = 1;segment < snakeLegnth;segment++)
    //{
	//	if ( didIEatMyself(snakeBody[segment] )) 
	//	{
	//		clearSnake(segment);
	//	}
	//}
   
   
   //This is going to perform poorly, probably
   //A grid system should be implemented like we talked about
   //for now a range check is given
	var len = mushrooms.length;
	for(var i = 0; i < len; i++)
	{
 		if ( ( headPosition['x'] < mushrooms[i].x + collisionDist && headPosition['x'] > mushrooms[i].x - collisionDist)
			&& ( headPosition['y'] < mushrooms[i].y + collisionDist && headPosition['y'] > mushrooms[i].y - collisionDist ))
		{
			//turn left
			//alert('Mushroom collision');
		
			switch(direction){
				case 'up':
					direction = 'left';
					return;
				break;
 
				case 'down':
					direction = 'right';
					return;
				break;
 
				case 'left':
					direction = 'down';
					return;
				break;
 
				case 'right':
					direction = 'up';
					return;
				break;
			}
		
		}
	}
   
   
 }

 //Calculate position functions
 function leftPosition(){
  return headPosition['x'] - segmentSize;  
 }
  
 function rightPosition(){
   return headPosition['x'] + segmentSize;
  }
 
 function upPosition(){
   return headPosition['y'] - segmentSize;  
 }
 
 function downPosition(){
   return headPosition['y'] + segmentSize;
}
 
 //movement functions, these contain bounds checks for walls
 function moveUp(){
    if (upPosition() >= 0) {
        executeMove('up', 'y', upPosition());
    }
	else 
	{
        turnOnWallCollision('x');
    }
 }
  
 function moveDown(){
    if (downPosition() < canvas.height) {
      executeMove('down', 'y', downPosition());    
   }
   else 
	{
        turnOnWallCollision('x');
    }
 }
 
 function moveLeft(){
   if (leftPosition() >= 0) {
     executeMove('left', 'x', leftPosition());
   }
   else 
	{
        turnOnWallCollision('y');
    }
 }
 
 function moveRight(){
   if (rightPosition() < canvas.width) {
     executeMove('right', 'x', rightPosition());
   }
   else 
	{
        turnOnWallCollision('y');
    }
 }
 
 function executeMove(dirValue, axisType, axisValue) {
   direction = dirValue;
   headPosition[axisType] = axisValue;
   drawSnake();
}
 
 //move the snake
 function moveSnake(){
   switch(direction){
    case 'up':
       moveUp();
       break;
 
     case 'down':
       moveDown();
       break;
 
     case 'left':
      moveLeft();
      break;
 
     case 'right':
       moveRight();
       break;
   }
 }
 
 //turns snake on collision with wall
 function turnOnWallCollision(axisType){  
   if (axisType=='x') {
     a = (headPosition['x'] > canvas.width / 2) ?  moveLeft() : moveRight();
   } else {
     a = (headPosition['y'] > canvas.height / 2) ? moveUp() : moveDown();
   }
 }
 
 function addMushroom(_x,_y)
 {
		//Drop box, this will be a mushroom or bomb later
		ctx = canvas.getContext('2d');
		//green fill
		ctx.fillStyle = "rgb(0,255,0)";
		ctx.fillRect(_x, _y, 10, 10);
	
		mushrooms.push({x:_x, y:_y})
 }
 
 //self collision test
 function didIEatMyself(element) 
 {
    //return ( ( (element[0] < headPosition['x'] + eatRange) && ( element[0] > headPosition['x'] - eatRange))
	//	&& ( (element[1] < headPosition['y'] + eatRange) && (element[1] > headPosition['y'] - eatRange ) ));

	return ( element[0] == headPosition['x'] && element[1] == headPosition['y']); 	
 }
 
//gets mouse position
function getPosition(event)
{
        var x = new Number();
        var y = new Number();
        var canvas = document.getElementById("canvas");

        if (event.x != undefined && event.y != undefined)
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

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;

		addMushroom(x,y);
}