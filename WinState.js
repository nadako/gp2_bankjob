var WinState = function(image, nextState, scoreOffset)
{
    this.image = image;
    this.nextState = nextState;
    scoreOffset = scoreOffset || 0;

    this.draw = function()
    {
        this.drawOld();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px MainFont";
        ctx.fillText("SCORE: " + game.currentLevel.houseCount + " (total " + totalBagsOfGold + ")", 255, 115 + scoreOffset);

        if (game.currentLevel.houseCount == 0)
        {
            ctx.fillStyle = "#FF0000";
            ctx.fillText("next time try to actually do", 175, 115 + scoreOffset + 30);
            ctx.fillText("the bank job, loser", 250, 115 + scoreOffset + 60);
        }
    }
};

WinState.prototype = new SimpleImageState();
WinState.prototype.drawOld = WinState.prototype.draw;
