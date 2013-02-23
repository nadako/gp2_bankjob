var WinState = function(score)
{
    this.draw = function()
    {
        // Clear the screen
        ctx.fillStyle = "cyan";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#FF00AA";
        ctx.font = "30px Arial Black";
        ctx.fillText("YOU STOLE: " + score + " bags of gold!", 300, 300);

        if (!isLastLevel())
            ctx.fillText("press a key to steal more", 300, 330);
        else
            ctx.fillText("nothing more to steal", 300, 330);
    }

    function isLastLevel()
    {
        return (game.levelId >= levelDefs.length - 1);
    }

    this.keyPress = function(e)
    {
        if (!isLastLevel())
            changeState(new PlayState(game.levelId + 1))
    }
};

WinState.prototype = new BaseState();