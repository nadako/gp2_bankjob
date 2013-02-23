//-------------------------------------------------------
// Base class for the game object
//-------------------------------------------------------


Game = function () {

    this.player = new Player();
}

Game.prototype.resetLevel = function (levelId) {

    this.currenLevel = new Level(levelDefs[levelId]);
    this.player.reset(0, 0, 5, 100);
}


Game.prototype.Load = function () {

    this.resetLevel(0);

}

Game.prototype.Calculate = function () {

    this.player.update(tickperframe);
    this.currenLevel.update(tickperframe);

    if (this.currenLevel.isDeadly(this.player.positionIndex))
    {

    }
    else if (this.currenLevel.isFinished())
    {

    }
}


Game.prototype.Render = function () {

    this.player.draw();
    this.currenLevel.draw();
}


//---------------------------------------------
// input logic

Game.prototype.onLeftPressed = function (e) {

    this.player.tryMoveLeft();
}

Game.prototype.onRightPressed = function (e) {

    if (this.playerPosIndex < this.levelMap.length)
        this.playerPosIndex ++;
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




