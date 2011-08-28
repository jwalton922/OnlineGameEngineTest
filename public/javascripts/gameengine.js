var DIRECTIONS = ["e", "se", "s", "sw", "w", "nw", "n", "ne"];
var canvas;
var context;
var preloadcontext;
var players = new Array();
var isTargetSelectMode = false;
var groundImage;

function initCanvas() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    preloadcanvas = document.getElementById("preloadcanvas");
    preloadcontext = preloadcanvas.getContext("2d");
    groundImage = new Image();
    groundImage.src = "images/grasstile.bmp";
    groundImage.onload = preloadImage(groundImage);
}

function processKeyPress(e) {
    keynum = e.which;
    //alert('key press of: '+keynum+" looking for: "+"a".charCodeAt(0));
    if( "a".charCodeAt(0) == keynum) {
        canvas.style.cursor="crosshair";
        isTargetSelectMode = true;
    }
}

/* TODO eventually will probably have a target id so that this
 * method will be called periodically with updated coordinates
 * for the target (because target is likely moving so need
 * to update where the player needs to move to attack) */
function processAttackRequest(player, x, y) {
    distToTarget = calcDistance(player.getX(), player.getY(), x, y);
    if(distToTarget > player.getAttackDistance()) {
        //move to attack distance
        deltaX = x-player.getX();
        deltaY = y-player.getY();

        angle = Math.atan(deltaY / deltaX);
        dx = Math.abs(Math.cos(angle)*player.getAttackDistance());
        dy = Math.abs(Math.sin(angle)*player.getAttackDistance());

        if(deltaX > 0) {
            x = x -dx;
        } else if(deltaX < 0){
            x = x+dx;
        } else {
            x = 0;
        }

        if(deltaY > 0) {
            y = y-dy;
        } else if (deltaY < 0) {
            y = y+dy;
        } else {
            y = 0;
        }
        angle = 180.0 / Math.PI * angle;
        direction = determineDirection(deltaX, deltaY);
        waypoints = createWayPoints(player.getX(), player.getY(), x, y, direction, player.getSpeed(), angle);
        
        player.addActionToQueue("attack");
        player.addActionToQueue("move");
        player.setWayPoints(waypoints);
        isTargetSelectMode = false;
        player.setActionComplete(true);
        canvas.style.cursor="default";
    } else {
        angle = Math.atan(deltaY / deltaX);

        angle = 180.0 / Math.PI * angle;
        direction = determineDirection(deltaX, deltaY);
        player.clearActionQueue();
        player.clearWayPoints();
        player.AddActionToQueue("attack");
        player.setIsActionComplete(true);
        isTargetSelectMode = false;
    }
}

function calcDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1, 2)+Math.pow(y2-y1, 2));
}

function processMoveRequest(player, x, y) {
    playerX=player.getX();
    playerY=player.getY();

    deltaX = x-playerX;
    deltaY = y-playerY;
    direction = determineDirection(deltaX, deltaY);
    angle = 180.0 / Math.PI * Math.atan(deltaY/deltaX);
    waypoints = createWayPoints(playerX, playerY, x, y, direction, player.getSpeed(), angle);
    player.setWayPoints(waypoints);
    player.setActionComplete(true);
    player.clearActionQueue();
    player.addActionToQueue("move");
    
}

/*
 *process mouse click
 */
function processClick(e){

    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
	x = e.pageX;
	y = e.pageY;
    }
    else {
	x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
	y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    if(isTargetSelectMode){
        processAttackRequest(players[0], x, y)
    } else {
         processMoveRequest(players[0], x, y);
    }
}




function updateCharacters() {
    for(i = 0; i < players.length; i++) {
        if(players[i].isActionComplete()) {
            completedAction = players[i].getCurrentActionName();
            action = players[i].getNextAction();
            console.log("completed action: "+completedAction+" changing action to: "+action);
            players[i].setActionComplete(false);
            players[i].setCurrentAction(action);
        }
        moveCharacter(players[i]);
        direction = players[i].getCurrentDirection();
        actionSprites = players[i].getCurrentAction();
        frame = actionSprites[direction].updateFrame();
    }
}

function moveCharacter(player) {
    waypoint = player.popWayPoint();
    if(waypoint != null) {
        player.setX(waypoint.getX());
        player.setY(waypoint.getY());
        player.setCurrentDirection(waypoint.getDirection());

        if(player.hasMoreWayPoints() ){

        } else {
            if(player.getCurrentAction() == ("pause")) {

            } else {
                player.setActionComplete(true);
            }
        }
    }

    
}

function draw() {
    drawGround();
    drawCharacters();
}

function drawGround() {
    canvas.width=canvas.width;
    context.drawImage(groundImage, 0, 0, 256, 192, 0, 0, 500, 500);
    //console.log("drawing ground");
}

function drawCharacters() {

    frame = character.getFrame();
    
    for(i = 0; i < players.length; i++){
        direction = players[i].getCurrentDirection();
        actionSprites = players[i].getCurrentAction();
        frame = actionSprites[direction].getFrame();
        //alert('image: '+actionSprites[direction].getSpriteImage()+" params: "+frame.getX()+" "+frame.getY()+" "+ frame.getWidth()+" "+ frame.getHeight());

        try {
            context.drawImage(actionSprites[direction].getSpriteImage(), frame.getX(), frame.getY(), frame.getWidth(), frame.getHeight(), players[i].getX()-players[i].getWidth()/2, players[i].getY()-players[i].getHeight()/2, 96, 96 );
        }catch(err){

        }
    }

    /* context.drawImage(character.getSpriteImage(), frame.getX(), frame.getY(), frame.getWidth(), frame.getHeight(),0, 0, 96, 96 );
     * 
     */
}

/* could get errors or return wrong direction if
 * deltaX and deltaY = 0
 */
function determineDirection(deltaX, deltaY) {
    if(deltaX != 0) {
        angle = 180.0 / Math.PI * Math.atan(deltaY/deltaX);
    }
    //alert("angle: "+angle);
    //postive x is to the right
    //positive y is down
    direction = "e";
    if(deltaX > 0 && deltaY > 0) {
        if(angle <= 22.5) {
            direction = "e";
        } else if(angle <= 67.5) {
            direction ="se"
        } else {
            direction = "s";
        }
    } else if(deltaX < 0 && deltaY > 0) {
        if(angle >= -22.5) {
            direction = "w";
        } else if(angle >= -67.5) {
            direction = "sw";
        } else {
            direction = "s";
        }
    } else if(deltaX < 0 && deltaY < 0) {
        if(angle < 22.5) {
            direction = "w";
        } else if(angle < 67.5) {
            direction = "nw";
        } else {
            direction = "n";
        }

    } else if(deltaX > 0 && deltaY < 0) {
        if(angle >= -22.5) {
            direction = "e";
        } else if(angle >= -67.5) {
            direction = "ne";
        } else {
            direction = "n";
        }
    } else if(deltaX == 0){
        if(deltaY > 0){
            direction = "s";
        } else if(deltaY < 0) {
            direction ="n";
        }
    } else if(deltaY == 0){
        if(deltaX > 0) {
            direction = "e";
        } else if(deltaX < 0) {
            direction = "w";
        }
    }

    return direction;
}

function createWayPoints(initX, initY, destX, destY, direction, speed, angle) {

    /* determine number of steps to get to destination */
    dx = destX - initX;
    dy = destY - initY;
    distToTravel = Math.sqrt(dx*dx+dy*dy);
    numPointsReq = distToTravel / speed;
    atDestination = false;
    deltaX = Math.abs(speed * Math.cos(Math.PI / 180.0 * angle));
    deltaY = Math.abs(speed * Math.sin(Math.PI / 180.0 * angle));

    if(dx > 0 && dy > 0) {
        //both are pos, good here
    } else if(dx < 0 && dy > 0) {
        deltaX = deltaX * -1;
    } else if(dx < 0 && dx < 0) {
        deltaX = deltaX * -1;
        deltaY = deltaY * -1;
    } else if(dx > 0 && dy < 0) {
        deltaY = deltaY * -1;
    }

    waypoints = new Array();
    x = initX;
    y = initY;
    Math.sqrt()
    numPoints = 0;
    /* potential rounding issues here - at high speeds won't end
     * up exactly at destination, might have to change later */
    while(numPoints < numPointsReq) {
        x = x+deltaX;
        y = y+deltaY;
        waypoint = new WayPoint(x,y,direction);
        waypoints.push(waypoint);

        numPoints++;
    }

    waypoints.pop();
    lastWayPoint = new WayPoint(destX,destY, direction);
    waypoints.push(lastWayPoint);
    /* reverse waypoints so pop can be used when getting them */
    waypoints.reverse();
    return waypoints;
}

