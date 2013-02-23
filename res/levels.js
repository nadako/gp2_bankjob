var lazor = {
    animDuration: 2000,
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

var levelDefs = [

    {
         duration: 15000,
         bg: "bg.png",
         tilecoord: {x: 0, y: 258},
         obstacles: [ lazor, lazor ]
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