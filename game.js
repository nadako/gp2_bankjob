//-------------------------------------------------------
// Base class for the game object
//-------------------------------------------------------


Game = function () {

    this.player = new Player();
    this.bullet = null;
    this.levelId = 0;
}

Game.prototype.startLevel = function (levelId) {

    this.lastBulletTime = 0;
    this.bulletSpawnDuration = 8000;
    this.levelId = levelId;
    this.currentLevel = new Level(levelDefs[levelId]);
    this.timeWidget = new TimeWidget(252, 50, this.currentLevel.def.duration);
    this.player.reset(this.currentLevel.def.tilecoord.x, this.currentLevel.def.tilecoord.y,  this.currentLevel.numObstacles() + 1, Config.TILE_SIZE);
}

Game.prototype.Load = function () {

    this.pickupSound = new buzz.sound(Config.BASE_URL + "pickup.wav");
    this.putdownSound = new buzz.sound(Config.BASE_URL + "putdown.wav");
    this.stepSound = new buzz.sound(Config.BASE_URL + "step.wav");
    this.deathSound = new buzz.sound(Config.BASE_URL + "death.wav");
    this.winSound = new buzz.sound(Config.BASE_URL + "win.wav");
}

Game.prototype.Calculate = function () {

    this.player.update(tickperframe);
    this.currentLevel.update(tickperframe);
    this.timeWidget.update(tickperframe, this.currentLevel.time);

    var pos = this.player.positionIndex;
    if (pos > 0 && pos <= this.currentLevel.numObstacles() && this.currentLevel.isDeadly(pos - 1))
    {
        this.playerDeath();
    }
    else if (this.currentLevel.isFinished())
    {
        if (pos == 0)
        {
            this.playerWin();
        }
        else
        {
            this.playerArrest();
        }
    }

    else if (this.bullet == null)
    {
        /*
        if (this.currentLevel.time - this.lastBulletTime > this.bulletSpawnDuration && pos < this.currentLevel.numObstacles()-1 )
        {
            this.bullet = null;//new Bullet(canvas.width, 300, -0.5);
        }
*/
    }
    else
    {
        this.bullet.update(tickperframe);
        if (pos < 1 || this.bullet.position.x <= Config.TILE_SIZE)
            this.bullet = null;
    }
}

Game.prototype.playerDeath = function()
{
    this.deathSound.play();
    totalBagsOfGold -= this.currentLevel.houseCount;
    totalDeaths++;
    changeState(new SimpleImageState("dead.png", new PlayState(game.levelId)));
};

Game.prototype.playerWin = function()
{
    this.winSound.play();

    var lastLevel = game.levelId >= levelDefs.length - 1;
    var nextState;
    if (game.currentLevel.houseCount && lastLevel)
        nextState = new WinState("win_final.png", null, 50);
    else
        nextState = new WinState("win.png", new PlayState(game.currentLevel.houseCount ? game.levelId + 1 : game.levelId));

    changeState(nextState);
};

Game.prototype.playerArrest = function()
{
    this.deathSound.play();
    totalBagsOfGold -= this.currentLevel.houseCount;
    changeState(new SimpleImageState("busted.png", new PlayState(game.levelId)));
};

Game.prototype.checkPlayerAtHome = function()
{
    if (this.player.getCurrentState() != this.player.GETTING_AWAY_STATE)
        return;

    if (this.player.positionIndex == 0)
    {
        this.player.setCurrentState(this.player.GOTO_DEAL_STATE);
        this.currentLevel.houseCount++;
        totalBagsOfGold++;
        this.putdownSound.play();
    }
}

Game.prototype.checkPlayerAtBank = function()
{
    if (this.player.getCurrentState() != this.player.GOTO_DEAL_STATE)
        return;

    if (this.player.positionIndex == this.currentLevel.numObstacles() + 1)
    {
        this.player.setCurrentState(this.player.GETTING_AWAY_STATE);
        this.pickupSound.play();
    }
}

Game.prototype.Render = function () {

    this.currentLevel.draw();
    this.player.draw();
    this.timeWidget.draw();

    if (this.bullet != null)
       this.bullet.draw();

    ctx.fillStyle = "#000000";
    ctx.fillStyle = "#000000";
    ctx.font = "24px MainFont";
    ctx.fillText("SCORE: " + this.currentLevel.houseCount + " (total " + totalBagsOfGold + ")", 225, 20);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("LEVEL: " + (this.levelId + 1), 50, 20);
    ctx.fillText("TIME: " + formatTime(), 50, 40);

    ctx.fillStyle = "#FF0000";
    ctx.fillText("DEATHS: " + totalDeaths, 470, 20);
}

function formatTime()
{
    var msecs = game.currentLevel.def.duration - game.currentLevel.time;
    return Math.ceil(msecs / 1000).toFixed(0);
}


//---------------------------------------------
// input logic

Game.prototype.onLeftPressed = function (e) {

    if (this.player.tryMoveLeft())
        this.stepSound.play();
    this.checkPlayerAtBank();
    this.checkPlayerAtHome();
}

Game.prototype.onRightPressed = function (e) {

    if (this.player.tryMoveRight())
        this.stepSound.play();
    this.checkPlayerAtBank();
    this.checkPlayerAtHome();
}

//---------------------------------------------
// mouse input


Game.prototype.onmouseup = function (e) {

    if (e.layerX < this.player.position.x)
        this.onLeftPressed();
    else if (e.layerX > this.player.position.x + this.player.getCurrentSprite().currentFrame.width)
        this.onRightPressed();
}

//---------------------------------------------

Game.prototype.onkeyup = function (e) {

    // left
    if (e.which == 37) this.onLeftPressed();
    // right
    if (e.which == 39) this.onRightPressed();
}




