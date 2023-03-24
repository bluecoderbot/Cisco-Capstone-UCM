

// export const introMessage = {
//     message: "Hello welcome to our application!"
// };

export const outputLog = [
    {
        id: 0,
        action: "Please Begin By:",
        description: "Scanning Management Switch labeled Box 1"
    },
    // {
    //     id: 1,
    //     action:"Master Setup:",
    //     description:"Initialized"
    // }
    // { 
    //     id: 2,
    //     action:"Server Wiring Test 1:",
    //     description:"Initialized"
    // },
    // {
    //     id: 3,
    //     action:"Server Wiring Test 2:",
    //     description:"Initialized"
    // },
    // {
    //     id: 4,
    //     action:"Server Wiring Test 3:",
    //     description:"Initialized"
    // }
]

// export const managmentSwitch= [
//     {
//         instruction: "Connect switch port 1 to server 3 port 5"
//     },
//     {
//         instruction: "Connect switch port 3 to server 5 port 2"
//     },
//     {
//         instruction: "Connect switch port 4 to server 4 port 5"
//     },
//     {
//         instruction: "Connect switch port 2 to server 2 port 3"
//     }
// ]
// export const switchData = {

//     name: "MANAGMENT Switch",
//     instructions: [
//         "Connect switch port 1 to server 3 port 5",
//         "Connect switch port 3 to server 5 port 2",
//         "Connect switch port 4 to server 4 port 5",
//         "Connect switch port 2 to server 2 port 3",

//         // Testing Instructions
//         // "Connect switch port 4 to server 4 port 5",
//         // "Connect switch port 4 to server 4 port 5",
//         // "Connect switch port 4 to server 4 port 5",
//         // "Connect switch port 4 to server 4 port 5",
//         // "Connect switch port 4 to server 4 port 5",
//         // "Connect switch port 4 to server 4 port 5",
//         // "Connect switch port 4 to server 4 port 5",
//         // "Connect switch port 4 to server 4 port 5",

//     ],
//     // Maybe store icon and styling within this array?
//     testing: [
//         "PASS"
//     ]
// }

export const switchData = {
    switches: [
        {
            name: "Managment Switch",
            instructions: [
                "Connect switch port 1 to server 1 at port 0",
                "Connect switch port 2 to server 2 at port 0",
                "Connect switch port 3 to server 3 at port 0",
                "Connect switch port 4 to server 4 at port 0",
                "Connect switch port 5 to server 5 at port 0"
            ],
            testing: "SUCCESS",
            rewire_instructions: [
                {
                    plugout: [

                    ],
                    plugin: [

                    ]
                }
            ],
            retest: ""
        },
        {
            name: "Tor 1 Switch",
            instructions: [
                "Connect switch port 1 to server 1 at port 1",
                "Connect switch port 2 to server 2 at port 1",
                "Connect switch port 3 to server 3 at port 1",
                "Connect switch port 4 to server 4 at port 1",
                "Connect switch port 5 to server 5 at port 1"
            ],
            testing: "FAILED WIRING",

            rewire_instructions: [
                "Plug out wire connecting switch: 6 port: 1 and server: 2 port: 1",
                "Plug out wire connecting switch: 6 port: 2 and server: 1 port: 1",
                "Plug in wire connecting switch: 6 port: 1 and server: 1 port: 1",
                "Plug in wire connecting switch: 6 port: 2 and server: 2 port: 1"
            ],
            retest: "SUCCESS"
        },
        {
            name: "Tor 2 Switch",
            instructions: [
                "Connect switch port 1 to server 1 at port 2",
                "Connect switch port 2 to server 2 at port 2",
                "Connect switch port 3 to server 3 at port 2",
                "Connect switch port 4 to server 4 at port 2",
                "Connect switch port 5 to server 5 at port 2"
            ],
            testing: "SUCESS",
            rewire_instructions: [
                {
                    plugout: [

                    ],
                    plugin: [

                    ]
                }
            ],
            retest: ""
        }
    ]
}

export const switch_data = {
    order: ["0", "6", "7"],
    instructions: {
        "0": [
            [1, 1, 0],
            [2, 2, 0],
            [3, 3, 0],
            [4, 4, 0],
            [5, 5, 0]
        ],

        "6": [
            [1, 1, 1],
            [2, 2, 1],
            [3, 3, 1],
            [4, 4, 1],
            [5, 5, 1]
        ],

        "7": [
            [1, 1, 2],
            [2, 2, 2],
            [3, 3, 2],
            [4, 4, 2],
            [5, 5, 2]
        ]

    },
    plain_text: {
        "0": [
            "connect switch port 1 to server 1 at port 0",
            "connect switch port 2 to server 2 at port 0",
            "connect switch port 3 to server 3 at port 0",
            "connect switch port 4 to server 4 at port 0",
            "connect switch port 5 to server 5 at port 0"
        ],

        "6": [
            "connect switch port 1 to server 1 at port 1",
            "connect switch port 2 to server 2 at port 1",
            "connect switch port 3 to server 3 at port 1",
            "connect switch port 4 to server 4 at port 1",
            "connect switch port 5 to server 5 at port 1"
        ],

        "7": [
            "connect switch port 1 to server 1 at port 2",
            "connect switch port 2 to server 2 at port 2",
            "connect switch port 3 to server 3 at port 2",
            "connect switch port 4 to server 4 at port 2",
            "connect switch port 5 to server 5 at port 2"
        ]
    },

    "mistake_order": [0, 1, 0],

    "mistake": {

        "0": { "plugout": [], "plugin": [] },

        "6": {
            "plugout": [[2, 1, 6, 1],
            [1, 1, 6, 2]],
            "plugin": [[1, 1, 6, 1],
            [2, 1, 6, 2]]
        },

        "7": { "plugout": [], "plugin": [] }

    },


    plain_text_rewire:
    {

        "0": { "plugout": [], "plugin": [] },

        "6": {
            "plugout": [
                "Plug out wire connecting switch: 6 port: 1 and server: 2 port: 1",
                "Plug out wire connecting switch: 6 port: 2 and server: 1 port: 1"
            ],
            "plugin": [
                "Plug in wire connecting switch: 6 port: 1 and server: 1 port: 1",
                "Plug in wire connecting switch: 6 port: 2 and server: 2 port: 1"
            ]
        },

        "7": { "plugout": [], "plugin": [] }
    }
}

const dummyData = { outputLog, switchData };
// const dummyData ={managmentSwitch};

export default dummyData;