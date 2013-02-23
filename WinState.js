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
    }
};

WinState.prototype = new SimpleImageState();
WinState.prototype.drawOld = WinState.prototype.draw;
