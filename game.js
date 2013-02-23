//-------------------------------------------------------
// Base class for the game object
//-------------------------------------------------------


Game = function () {

    this.player = new Player();
    this.levelMap = new LevelMap();
}

Game.prototype.resetLevel = function () {

    this.player.reset();
    this.levelMap.reset();
}


Game.prototype.Load = function () {

    this.resetLevel();
}

Game.prototype.Calculate = function () {

    if (this.levelMap.update(this.playerPosIndex))
    {

    }
    else
    {

    }
    this.playerSpr.update(tickperframe);
}


Game.prototype.Render = function () {

    this.playerSpr.draw(this.playerPos.x, this.playerPos.y);
    this.levelMap.draw();
}


//---------------------------------------------
// input logic

Game.prototype.onLeftPressed = function (e) {

    if (this.playerPosIndex > 0)
       this.playerPosIndex --;
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




