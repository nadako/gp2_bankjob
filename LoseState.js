var LoseState = function(reason)
{
    this.draw = function()
    {
        // Clear the screen
        ctx.fillStyle = "cyan";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#FF00AA";
        ctx.font = "30px Arial Black";
        ctx.fillText("YOU LOSE: " + reason, 300, 300);
        ctx.fillText("press a key to restart", 300, 330);
    }

    this.keyPress = function(e)
    {
        changeState(new PlayState(0));
    }
};

LoseState.prototype = new BaseState();