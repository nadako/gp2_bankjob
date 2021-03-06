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

var flame = {
    fps: 2,
    frames: [
        {image: "trap3_idle1.png", deadly: false},
        {image: "trap3_idle2.png", deadly: false},
        {image: "trap3_idle1.png", deadly: false},
        {image: "trap3_idle2.png", deadly: false},
        {image: "trap3_on1.png", deadly: true},
        {image: "trap3_on2.png", deadly: true}
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

var defaultHouseTiles = [
    "tunnel_tile.png",
    "home_gold1.png",
    "home_gold2.png",
    "home_gold3.png"
];

var levelDefs = [
    {
         duration: 15000,
         bg: "bg.png",
         bankTile: "bank_cash_tile.png",
         houseTiles: defaultHouseTiles,
         tilecoord: {x: 0, y: 258},
         obstacles: [ empty, empty, empty, empty, grinder, empty ]
    },

    {
        duration: 30000,
        bg: "bg.png",
        bankTile: "bank_cash_tile.png",
        houseTiles: defaultHouseTiles,
        tilecoord: {x: 0, y: 258},
        obstacles: [ empty, grinder, empty, empty, grinder, empty ]
    },

    {
        duration: 30000,
        bg: "bg.png",
        bankTile: "bank_cash_tile.png",
        houseTiles: defaultHouseTiles,
        tilecoord: {x: 0, y: 258},
        obstacles: [ empty, grinder, empty, lazor, empty, empty ]
    },
    {
        duration: 30000,
        bg: "bg.png",
        bankTile: "bank_cash_tile.png",
        houseTiles: defaultHouseTiles,
        tilecoord: {x: 0, y: 258},
        obstacles: [ empty, flame, empty, lazor, empty, grinder ]
    },
    {
        duration: 35000,
        bg: "bg.png",
        bankTile: "bank_cash_tile.png",
        houseTiles: defaultHouseTiles,
        tilecoord: {x: 0, y: 258},
        obstacles: [ grinder, empty, lazor, flame, empty, grinder ]
    }
]