// ----------------------------------------
// main.js - entry point of program
// Sets up game loop and all calls to game.js where actual game code goes
//-----------------------------------------

// Global vars
fps = null; 
canvas = null;
ctx = null;

var game = null;

// number of miliseconds in current frame
var tickperframe = 0;
// number of seconds in current frame, choose what is best for your needs
var secperframe = 0;

totalBagsOfGold = 0;
totalDeaths = 0;


var currentState = null;

function changeState(newState)
{
    if (currentState != null)
        currentState.exit();
    currentState = newState;
    currentState.enter();
}

// ----------------------------------------



function GameTick(elapsed)
{
    secperframe = elapsed;
    tickperframe = elapsed*1000;

    fps.update(secperframe);

    if (currentState != null)
    {
        currentState.update(tickperframe);
        // reset transformation matrix to indentity
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        currentState.draw();
    }

/*
    // Draw FPS
	ctx.fillStyle = "#FF00AA";    
    ctx.font="15px MainFont";
    ctx.fillText("FPS: "+ fps.str_fps,20,20);
*/
}


window.onload = function () {

    canvas = document.getElementById("screen");

    ctx = canvas.getContext("2d");
    fps = new FPSMeter("fpsmeter", document.getElementById("fpscontainer"));

    music = new buzz.sound(Config.BASE_URL + "gamemusic.mp3");
    music.load();

    game = new Game();
    game.Load();

    changeState(new SimpleImageState("game_start.png", new SimpleImageState("tutorial.png", new PlayState(0))));
    GameLoopManager.run(GameTick);

    //canvas.onmousedown = function (e) {      game.onmousedown(e);    };
    //canvas.onmousemove = function (e) {      game.onmousemove(e);    };
    //canvas.onmouseup = function (e) {      game.onmouseup(e);    };
    canvas.onmousedown = function (e) { currentState.mouseUp(e); };

    //document.onkeydown = function (e) {      game.onkeydown(e);    };
    //document.onkeypress = function (e) {      game.onkeypress(e);    };
    document.onkeydown = function (e) {      currentState.keyPress(e);    };
};

