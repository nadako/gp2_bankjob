var MainMenuState = function()
{
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
        // Clear the screen
        ctx.fillStyle = "cyan";
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        ctx.fillStyle = "#FF00AA";
        ctx.font = "15px Arial Black";
        ctx.fillText("PLAY THE GAME", 100, 20);
    }
};

MainMenuState.prototype = new BaseState();