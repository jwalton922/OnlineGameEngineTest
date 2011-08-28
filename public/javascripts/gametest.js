var character;

var timer_is_on = 0;

function initCharacters() {
    pc = new PlayerCharacter();
    pausedAction = createActionSpriteList("images/knight/knight_pause/", "paused", "png", 96, 96, 5, 9);
    movingAction = createActionSpriteList("images/knight/knight_move/", "running", "png", 96, 96, 5, 9);
    attackingAction = createActionSpriteList("images/knight/knight_attack/", "attack", "png", 96, 96, 5, 9);

    pc.addAction("pause", pausedAction);
    pc.addAction("move", movingAction);
    pc.addAction("attack", attackingAction);
    pc.addActionToQueue("pause");
    players.push(pc);
}

function doTest() {
    image = new Image();
    image.src = "images/zxypng.png";
    character = new Sprite(image);
    character.createFrames(96, 96, 5, 13);
}

function load() {
    initCanvas();
    initCharacters();
}

function start()
{
    alert('Starting!');

    doTest();

    doTimer();
}

function timedCount() {

    //updateFrameIndices();
    updateCharacters();
    draw();
    t=setTimeout("timedCount()",80);
}

function doTimer()
{
    if(!timer_is_on){
        timer_is_on = 1;
        timedCount();
    } else {
        timer_is_on = 0;
    }
}



function updateFrameIndices() {
    character.updateFrame();
}