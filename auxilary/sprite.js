// ----------------------------------------
// sprite.js - very simple sprite class. 
// You can modify it for your needs
//-----------------------------------------


Sprite = function( config )
{
    this.initialize(config);
}

Sprite.prototype.initialize = function(config)
{
    this.frames = [];
    this.valid  = false;
    this.currentFrame = {width: 0, height: 0};
    this.currentFrameIndex = 0;
    this.timer = 0;
    this.fps = config.fps;


    var waiting = config.frames.length;
    var that  = this;


    for (frame in config.frames)
    {
        var img = new Image();
        this.frames.push(img);

        img.onload = function()
        {
            waiting--;

            if (waiting <=0)
                that.valid = true;
        }
        img.src = config.baseUrl + "/" +config.frames[frame] + "?" + (new Date()).getTime();;
    }
}


Sprite.prototype.update = function(dt)
{
    if (!this.valid) return;

    this.timer += dt;
    this.currentFrameIndex = Math.floor( this.timer / (1000/this.fps) ) % this.frames.length;
    this.currentFrame=this.frames[this.currentFrameIndex];
}

Sprite.prototype.draw = function (x, y, w, h)
{
    if (!this.valid) return;
    if(arguments.length==2)   ctx.drawImage(this.currentFrame, x, y);
    else   ctx.drawImage(this.currentFrame, x, y, w, h);
}