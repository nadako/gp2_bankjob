/**
 * Created with IntelliJ IDEA.
 * User: astral
 * Date: 23.02.13
 * Time: 18:24
 * To change this template use File | Settings | File Templates.
 */

TimeWidget = function(x, y, maxTime)
{
    this.maxTime = maxTime;
    this.currentTime = 0;
    this.position = new Vec2(x, y);
    this.currentState = this.NORMAL_STATE;
    this.prepareView();
}

TimeWidget.prototype.NORMAL_STATE = "timeWidget_normalState";


TimeWidget.prototype.prepareView = function()
{
    this.animations ={"bar":{}, "car":{}};

    this.animations["bar"][this.NORMAL_STATE] = new Sprite({
        "baseUrl"  : "res/bankjob/"
        , "fps"    : 30
        , "frames" : [ "car_bar.png" ]
    });

    this.animations["car"][this.NORMAL_STATE] = new Sprite({
        "baseUrl"  : "res/bankjob/"
        , "fps"    : 3
        , "frames" : [ "car_blue.png", "car_red.png" ]
    });
}

TimeWidget.prototype.update = function(tpf, time)
{
    this.currentTime = time;
    this.animations["car"][this.currentState].update(tpf);
    this.animations["bar"][this.currentState].update(tpf);
}

TimeWidget.prototype.draw = function()
{
    var carAnim = this.animations["car"][this.currentState];
    var barAnim = this.animations["bar"][this.currentState];
    var progressX = this.position.x;// + this.currentTime/this.maxTime * (barAnim.currentFrame.width - carAnim.currentFrame.width);
    var barY = this.position.y + 35;///(carAnim.currentFrame.height - barAnim.currentFrame.height)/2;

    this.animations["bar"][this.currentState].draw(this.position.x, barY);
    this.animations["car"][this.currentState].draw(progressX, this.position.y);
}
