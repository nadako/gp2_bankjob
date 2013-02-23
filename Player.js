/**
 * Created with IntelliJ IDEA.
 * User: astral
 * Date: 23.02.13
 * Time: 16:31
 * To change this template use File | Settings | File Templates.
 */

Player = function()
{
    this.position = new Vec2(0, 0);
    this.positionIndex = 0;

    this.sprite = new Sprite({
        "baseUrl"  : "res/girl/"
        , "fps"    : 30
        , "frames" : ["girl_01.png", "girl_02.png", "girl_03.png","girl_04.png"
            , "girl_05.png", "girl_06.png", "girl_07.png", "girl_08.png"
            , "girl_09.png", "girl_10.png", "girl_11.png", "girl_12.png"
            , "girl_13.png", "girl_14.png", "girl_15.png", "girl_16.png" ]
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
    if (this.positionIndex > 0)
    {
        this.position.set(this.position.x - this.xOffset, this.position.y);
        this.positionIndex --;
    }
}

Player.prototype.tryMoveRight = function()
{
    if (this.positionIndex < this.maxPositionIndex)
    {
        this.position.set(this.position.x + this.xOffset, this.position.y);
        this.positionIndex ++;
    }
}

Player.prototype.update = function(tpf)
{
    this.sprite.update(tpf);
}

Player.prototype.draw = function()
{
    this.sprite.draw(this.position.x, this.position.y);
}