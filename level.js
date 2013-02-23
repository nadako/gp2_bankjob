var Level = function(def)
{
    this.def = def;
    this.obstacles = [];
    this.time = 0;
    this.bg = new Image();
    this.bg.src = Config.BASE_URL + def.bg + "?" + (new Date()).getTime();

    this.houseTiles = [];
    for (var i = 0; i < def.houseTiles.length; i++)
    {
        var img = new Image();
        img.src = Config.BASE_URL + def.houseTiles[i];
        this.houseTiles.push(img);
    }

    this.houseCount = 0;

    this.bankTile = new Image();
    this.bankTile.src = Config.BASE_URL + def.bankTile;

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

    var x = this.def.tilecoord.x;

    ctx.drawImage(this.getHouseTile(), x, this.def.tilecoord.y);
    x += Config.TILE_SIZE;

    for (var i = 0; i < this.obstacles.length; i++)
    {
        var obstacle = this.obstacles[i];
        obstacle.sprite.draw(x, this.def.tilecoord.y);
        x += Config.TILE_SIZE;
    }

    ctx.drawImage(this.bankTile, x, this.def.tilecoord.y)
}

Level.prototype.getHouseTile = function()
{
    if (this.houseCount < this.houseTiles.length)
        return this.houseTiles[this.houseCount];
    else
        return this.houseTiles[this.houseTiles.length - 1];
};

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
        fps: def.fps,
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