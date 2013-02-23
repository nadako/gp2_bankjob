var PlayState = function(level)
{
    this.enter = function()
    {
        game.startLevel(level);
        music.setVolume(10)
        music.loop();
        music.play();
    };

    this.exit = function()
    {
        music.stop();
        console.log("EXIT PLAY STATE");
    }

    this.update = function(dt)
    {
        // all game calculations here
        game.Calculate();
    };

    this.keyPress = function(e)
    {
        game.onkeyup(e);
    };

    this.mouseUp = function(e)
    {
        game.onmouseup(e);
    };

    this.draw = function()
    {
        // game render
        game.Render();
    };
}

PlayState.prototype = new BaseState();