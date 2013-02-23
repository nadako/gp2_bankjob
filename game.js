//-------------------------------------------------------
// Base class for the game object
//-------------------------------------------------------


Game = function () {

    this.player = new Player();
}

Game.prototype.resetLevel = function (levelId) {

    this.currenLevel = new Level(levelDefs[levelId]);
    this.player.reset(this.currenLevel.def.tilecoord.x, this.currenLevel.def.tilecoord.y,  this.currenLevel.numObstacles() + 1, Config.TILE_SIZE);
}

Game.prototype.Load = function () {

    this.pickupSound = new buzz.sound(Config.BASE_URL + "pickup.wav");
    this.putdownSound = new buzz.sound(Config.BASE_URL + "putdown.wav");
    this.stepSound = new buzz.sound(Config.BASE_URL + "step.wav");
    this.deathSound = new buzz.sound(Config.BASE_URL + "death.wav");
    this.resetLevel(0);
}

Game.prototype.Calculate = function () {

    this.player.update(tickperframe);
    this.currenLevel.update(tickperframe);

    var pos = this.player.positionIndex;
    if (pos > 0 && pos <= this.currenLevel.numObstacles() && this.currenLevel.isDeadly(pos - 1))
    {
        this.playerDeath();
    }
    else if (this.currenLevel.isFinished())
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
    this.deathSound.play();
};

Game.prototype.playerWin = function()
{
    console.log("WIN", this.currenLevel.houseCount);
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
        this.currenLevel.houseCount++;
        this.putdownSound.play();
    }
}

Game.prototype.checkPlayerAtBank = function()
{
    if (this.player.getCurrentState() != this.player.GOTO_DEAL_STATE)
        return;

    if (this.player.positionIndex == this.currenLevel.numObstacles() + 1)
    {
        this.player.setCurrentState(this.player.GETTING_AWAY_STATE);
        this.pickupSound.play();
    }
}

Game.prototype.Render = function () {

    this.currenLevel.draw();
    this.player.draw();
    ctx.fillStyle = "#FF00AA";
    ctx.fillText("SCORE: " + this.currenLevel.houseCount, 200, 20);
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


Game.prototype.onmouseclick = function (e) {

    if (e.screenX < canvas.width/2)
        onLeftPressed();
    else onRightPressed();
}

//---------------------------------------------

Game.prototype.onkeyup = function (e) {

    // left
    if (e.which == 37) this.onLeftPressed();
    // right
    if (e.which == 39) this.onRightPressed();;
}




