var lazor = {
    fps: 2,
    frames: [
        {image: "trap1_idle.png", deadly: false},
        {image: "trap1_idle.png", deadly: false},
        {image: "trap1_idle.png", deadly: false},
        {image: "trap1_idle.png", deadly: false},
        {image: "trap1_idle.png", deadly: false},
        {image: "trap1_on1.png", deadly: true},
        {image: "trap1_on2.png", deadly: true}
    ]
};

var grinder = {
    fps: 1,
    frames: [
        {image: "trap2_idle.png", deadly: false},
        {image: "trap2_on.png", deadly: true}
    ]
};

var empty = {
    fps: 1,
    frames: [
        {image: "tunnel_tile.png", deadly: false}
    ]
};


var levelDefs = [

    {
         duration: 15000,
         bg: "bg.png",
         tilecoord: {x: 0, y: 258},
         obstacles: [ lazor, grinder, empty, grinder ]
    },

    {
        duration: 15000,
        obstacles: [
            {
                animDuration: 1000,
                frames: [
                    {image: "test1.png", deadly: false},
                    {image: "test2.png", deadly: false},
                    {image: "test3.png", deadly: true}
                ]
            }
        ]
    }

]