function WorldObject(sprite, frameIndex,x,y, width, height){
    this.sprite = sprite;
    this.x = x;
    this.y = y
    this.frameIndex = frameIndex;
    this.width = width;
    this.height = height;

    this.getSprite = function(){return this.sprite;}
    this.getFrameIndex = function(){return this.frameIndex;}
    this.getX = function(){return this.x;}
    this.setX = function(x){this.x = x;}
    this.getY = function(){return this.y;}
    this.setY = function(y){this.y = y;}
    this.getWidth = function(){return this.width;}
    this.getHeight = function(){return this.height;}
}

function PlayerCharacter()
{
    this.name = name;
    this.x = 250;
    this.y = 250;
    this.width = 96;
    this.height = 96;
    this.currentAction = "pause"
    this.currentDirection = "e";
    this.actions = {};
    this.waypoints = new Array();
    this.speed = 8;
    this.attackDistance = 10;
    this.actionQueue = new Array();
    this.actionComplete = false;

    this.setActionComplete = function(isActionComplete) {
        this.actionComplete = isActionComplete;
    }
    
    this.isActionComplete = function() {
        return this.actionComplete;
    }

    /*
     * this removes action from the queue also
     */
    this.getNextAction = function() {
        if(this.actionQueue.length > 0) {
            action = this.actionQueue.pop();
            return action;
        } else {
            return "pause";
        }
    }

    this.addActionToQueue = function(action) {
        this.actionQueue.push(action);
    }

    this.addActionsToQueue = function(actions) {
        this.actionQueue.concat(actions);
    }

    this.clearActionQueue = function() {
        this.actionQueue = [];

    }

    this.clearWayPoints = function() {
        this.waypoints.clear();
    }

    this.getAttackDistance = function() {
        return this.attackDistance;
    }

    this.getWidth = function() {
        return this.width;
    }

    this.getHeight = function() {
        return this.height;
    }

    this.setSpeed = function(speed) {
        this.speed = speed;
    }

    this.getSpeed = function() {
        return this.speed;
    }
    /* note that the waypoints were reversed after creation */
    this.popWayPoint = function() {
        waypoint= this.waypoints.pop();
        return waypoint;
    }

    this.hasMoreWayPoints = function() {
        hasMore = false;
        if(this.waypoints != null && this.waypoints.length > 0){
            hasMore = true;
        }

        return hasMore;
    }

    this.setWayPoints = function(waypoints) {
        this.waypoints = waypoints;
    }

    this.addWayPoints = function(waypoints) {
        this.waypoints.push(waypoints);
    }

    this.getX = function() {
        return this.x;
    }

    this.setX = function(x) {
        this.x = x;
    }

    this.getY = function() {
        return this.y;
    }

    this.setY = function(y) {
        this.y = y;
    }

    this.getCurrentDirection = function() {
        return this.currentDirection;
    }

    this.setCurrentDirection = function(direction) {
       this.currentDirection = direction;
    }

    /* adds action to character -map of direction to sprite*/
    this.addAction = function(name, sprites) {
        this.actions[name] = sprites;
    }

    this.getCurrentActionName = function() {
        return this.currentAction;
    }
    /* returns character current action */
    this.getCurrentAction = function() {
        return this.actions[this.currentAction];
    }
    /* sets current action string */
    this.setCurrentAction = function(action) {
        this.currentAction = action;
        /* probably need to reset frameIndex here */
        //dirMap = this.actions[action];
       // dirMap[this.currentDirection].resetSprite();
    }
    /* gets direction to sprite map of input action */
    this.getAction = function(actionName)
    {
        return this.actions[actionName];
    }


}

function WayPoint(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.getX = function() {
        return this.x;
    }

    this.getY = function() {
        return this.y;
    }

    this.getDirection = function() {
        return this.direction;
    }
}