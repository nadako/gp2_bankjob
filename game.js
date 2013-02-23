//-------------------------------------------------------
// Base class for the game object
//-------------------------------------------------------


Game = function () {

    this.player = new Player();
}

Game.prototype.resetLevel = function (levelId) {

    this.currentLevel = new Level(levelDefs[levelId]);
    this.timeWidget = new TimeWidget(252, 50, this.currentLevel.def.duration);
    this.player.reset(this.currentLevel.def.tilecoord.x, this.currentLevel.def.tilecoord.y,  this.currentLevel.numObstacles() + 1, Config.TILE_SIZE);
}

Game.prototype.Load = function () {

    this.resetLevel(0);
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
}

Game.prototype.playerDeath = function()
{
    console.log("DEATH");
};

Game.prototype.playerWin = function()
{
    console.log("WIN", this.currentLevel.houseCount);
};

Game.prototype.playerArrest = function()
{
    console.log("ARREEST!");
};

Game.prototype.checkPlayerAtHome = function()
{
    if (this.player.getCurrentState() != this.player.GETTING_AWAY_STATE)
        return;

    if (this.player.positionIndex == 0)
    {
        this.player.setCurrentState(this.player.GOTO_DEAL_STATE);
        this.currentLevel.houseCount++;
    }
}

Game.prototype.checkPlayerAtBank = function()
{
    if (this.player.getCurrentState() != this.player.GOTO_DEAL_STATE)
        return;

    if (this.player.positionIndex == this.currentLevel.numObstacles() + 1)
    {
        this.player.setCurrentState(this.player.GETTING_AWAY_STATE);
    }
}

Game.prototype.Render = function () {

    this.currentLevel.draw();
    this.player.draw();
    this.timeWidget.draw();

    ctx.fillStyle = "#FF00AA";
    ctx.fillText("SCORE: " + this.currentLevel.houseCount, 200, 20);
}


//---------------------------------------------
// input logic

Game.prototype.onLeftPressed = function (e) {

    this.player.tryMoveLeft();
    this.checkPlayerAtBank();
    this.checkPlayerAtHome();
}

Game.prototype.onRightPressed = function (e) {

    this.player.tryMoveRight();
    this.checkPlayerAtBank();
    this.checkPlayerAtHome();
}

//---------------------------------------------
// mouse input


Game.prototype.onmouseup = function (e) {

    if (e.layerX < canvas.width/2)
        this.onLeftPressed();
    else this.onRightPressed();
}

//---------------------------------------------

Game.prototype.onkeyup = function (e) {

    // left
    if (e.which == 37) this.onLeftPressed();
    // right
    if (e.which == 39) this.onRightPressed();;
}




