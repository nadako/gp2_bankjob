/**
 * Created with IntelliJ IDEA.
 * User: astral
 * Date: 23.02.13
 * Time: 16:31
 * To change this template use File | Settings | File Templates.
 */

Player = function()
{
    this.DEAD_STATE = "player_deadState";
    this.WIN_STATE = "player_winState";
    this.GOTO_DEAL_STATE = "player_gotoDealState";
    this.GETING_AWAY_STATE = "playerGettingAwayState";

    this.position = new Vec2(0, 0);
    this.positionIndex = 0;
    this.currentState = this.GOTO_DEAL_STATE;

     this.prepareSprites();
}

Player.prototype.prepareSprites = function()
{
    this.animations =[];
    this.animations[this.GOTO_DEAL_STATE] = new Sprite({
        "baseUrl"  : "res/girl/"
        , "fps"    : 30
        , "frames" : [ "girl_16.png" ]
    });

    this.animations[this.GETTING_AWAY_STATE] = new Sprite({
        "baseUrl"  : "res/girl/"
        , "fps"    : 30
        , "frames" : [ "girl_16.png" ]
    });
}



Player.prototype.reset = function(startX, startY, maxPosIndex, xOffset)
{
    this.position.set(startX, startY);
    this.positionIndex = 0;
    this.maxPositionIndex = maxPosIndex;
    this.xOffset = xOffset;
}

Player.prototype.tryMoveLeft = function()
{
    var result =
        this.positionIndex > 0;

    if (result)
    {
        this.position.set(this.position.x - this.xOffset, this.position.y);
        this.positionIndex --;
    }
    return result;
}

Player.prototype.tryMoveRight = function()
{
    var result =
        this.positionIndex < this.maxPositionIndex;

    if (result)
    {
        this.position.set(this.position.x + this.xOffset, this.position.y);
        this.positionIndex ++;
    }
    return result;
}

Player.prototype.update = function(tpf)
{
    this.animations[this.currentState].update(tpf);
}

Player.prototype.draw = function()
{
    this.animations[this.currentState].draw(this.position.x, this.position.y);
}

Player.prototype.seCurrentState = function(stateId)
{
    this.currentState = stateId;
}

Player.prototype.geCurrentState = function()
{
    return this.currentState;
}