var SimpleImageState = function(image, nextState)
{
    this.image = image;
    this.nextState = nextState;

    this.enter = function()
    {
        this.bg = new Image();
        this.bg.src = Config.BASE_URL + this.image + "?" + (new Date()).getTime();

        if (this.nextState != null)
        {
            this.keyPress = function(e)
            {
                if (e.which == 13)
                {
                    changeState(this.nextState);
                }
            }

            this.mouseUp = function(e)
            {
                changeState(this.nextState);
            }
        }

    }

    this.draw = function()
    {
        ctx.drawImage(this.bg, 0, 0);
    }
};

SimpleImageState.prototype = new BaseState();