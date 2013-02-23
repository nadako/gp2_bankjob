var MainMenuState = function()
{
    this.enter = function()
    {
        this.bg = new Image();
        this.bg.src = Config.BASE_URL + "game_start.png";
    }

    this.keyPress = function(e)
    {
        if (e.which == 13)
        {
            changeState(new PlayState(0));
        }
    }

    this.mouseUp = function(e)
    {
        changeState(new PlayState(0));
    }

    this.draw = function()
    {
        ctx.drawImage(this.bg, 0, 0);
    }
};

MainMenuState.prototype = new BaseState();