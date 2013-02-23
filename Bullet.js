/**
 * Created with IntelliJ IDEA.
 * User: astral
 * Date: 23.02.13
 * Time: 20:31
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with IntelliJ IDEA.
 * User: astral
 * Date: 23.02.13
 * Time: 16:31
 * To change this template use File | Settings | File Templates.
 */

Bullet = function(x, y, speed)
{
    this.speed = speed;
    this.position = new Vec2(x, y);
    this.positionIndex = 0;
    this.currentState = this.SHOOT_STATE;
    this.prepareSprites();
}

Bullet.prototype.SHOOT_STATE = "bullet_shootState";


Bullet.prototype.prepareSprites = function()
{
    this.animations = {};
    this.animations[this.SHOOT_STATE] = new Sprite({
        "baseUrl"  : Config.BASE_URL
        , "fps"    : 30
        , "frames" : [ "creature.png" ]
    });
}

Bullet.prototype.getCurrentSprite = function()
{
    return this.animations[this.currentState];
}

Bullet.prototype.update = function(tpf)
{
    this.animations[this.currentState].update(tpf);
    this.position.x += this.speed;
}

Bullet.prototype.draw = function()
{
    this.animations[this.currentState].draw(this.position.x, this.position.y);
}

Bullet.prototype.setCurrentState = function(stateId)
{
    this.currentState = stateId;
}

Bullet.prototype.getCurrentState = function()
{
    return this.currentState;
}