var Level = function(def)
{
    this.def = def;
    this.obstacles = [];
    this.time = 0;
    this.bg = new Image();
    this.bg.src = Config.BASE_URL + def.bg;

    for (var i = 0; i < def.obstacles.length; i++)
    {
        this.obstacles.push(new Obstacle(def.obstacles[i]));
    }
};

Level.prototype.update = function(dt)
{
    this.time += dt;
    for (var i = 0; i < this.obstacles.length; i++)
        this.obstacles[i].update(dt);
};

Level.prototype.draw = function()
{
    ctx.drawImage(this.bg, 0, 0);

    for (var i = 0; i < this.obstacles.length; i++)
    {
        var obstacle = this.obstacles[i];
        obstacle.sprite.draw(this.def.tilecoord.x + i * Config.TILE_SIZE, this.def.tilecoord.y);
    }
}

Level.prototype.isDeadly = function(index)
{
    return this.obstacles[index].isDeadly();
};

Level.prototype.isFinished = function()
{
    return this.time >= this.def.duration;
};

Level.prototype.numObstacles = function()
{
    return this.obstacles.length;
}


var Obstacle = function(def)
{
    var spriteFrames = [];
    var config = {
        fps: (def.frames.length / (def.animDuration / 1000)),
        baseUrl: Config.BASE_URL,
        frames: spriteFrames
    };

    for (var i = 0; i < def.frames.length; i++)
        spriteFrames.push(def.frames[i].image);

    this.sprite = new Sprite(config);
    this.def = def;

};

Obstacle.prototype.update = function(dt)
{
    this.sprite.update(dt);
};

Obstacle.prototype.isDeadly = function()
{
    return this.def.frames[this.sprite.currentFrameIndex].deadly;
};