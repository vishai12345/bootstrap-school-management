
    var chart_config = {
        chart: {
            container: "#collapsable-example",

            animateOnInit: true,
            
            node: {
                collapsable: true
            },
            animation: {
                nodeAnimation: "easeOutBounce",
                nodeSpeed: 700,
                connectorsAnimation: "bounce",
                connectorsSpeed: 700
            }
        },
        nodeStructure: {
            image: "img/malory.png",
            children: [
                {
                    image: "img/lana.png",
                    collapsed: true,
                    childrenDropLevel: 2,
                    children: [
                        {
                            image: "img/figgs.png"
                        }
                    ]
                },
                {
                    image: "img/sterling.png",
                    childrenDropLevel: 5,
                    children: [
                        {
                            image: "img/woodhouse.png",
                        }
                    ]
                },
                {
                    pseudo: true,
                    children: [
                        {
                            image: "img/cheryl.png"
                        },
                        {
                            image: "img/pam.png"
                        }
                    ]
                }
            ]
        }
    };

    var config = {
        container: "#collapsable-example",

        animateOnInit: true,
        
        node: {
            collapsable: true 
        },
        animation: {
            nodeAnimation: "easeOutBounce",
            nodeSpeed: 700,
            connectorsAnimation: "bounce",
            connectorsSpeed: 700
        }
    },
    malory = {
        image: "img/malory.png"
    },

    lana = {
        parent: malory,
        image: "img/lana.png"
    }

    node1 = {
        parent: lana,
        image: "img/node1.png"
    }


    figgs = {
        parent: lana,
        image: "img/figgs.png"
    }

    sterling = {
        parent: malory,
        childrenDropLevel: 1,
        image: "img/sterling.png"
    },

    woodhouse = {
        parent: sterling,
        image: "img/woodhouse.png"
    },


    pam = {
        parent: sterling,
        image: "img/pam.png"
    },


    node5 = {
        parent: sterling,
        image: "img/pam.png"
    },

    node7 = {
        parent: sterling,
        image: "img/node7.png"
    },

    node8 = {
        parent: node7,
        image: "img/node8.png"
    },

    node6 = {
        parent: sterling,
        image: "img/node6.png"
    },

    pseudo = {
        parent: malory,
        pseudo: true
    },

    cheryl = {
        parent: pseudo,
        image: "img/cheryl.png"
    },

    pam = {
        parent: pseudo,
        image: "img/pam.png"
    },


    node2 = {
        parent: woodhouse,
        image: "img/pam.png"
    },

    node3 = {
        parent: node2,
        image: "img/node3.png"
    },

    node3 = {
        parent: node2,
        image: "img/node3.png"
    },

    node9 = {
        parent: node1,
        image: "img/node9.png"
    },





    chart_config = [config, malory, lana, figgs, sterling, woodhouse, pseudo, pam, cheryl, node1, node2, node3, node5, node6, node7, node8, node9];

