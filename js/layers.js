addLayer("a", {
    name: "Addition", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "+", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "+", description: "+: Reset for +", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11 :{
            title : "The Point Gen",
            description : "start generating points",
            cost: new Decimal(1)
        },
        12 :{
            title : "+1",
            description : "+1 to point generation",
            cost: new Decimal(1),
            unlocked() { return hasUpgrade('a',11)},
        },
        13 :{
            title : "+1 again",
            description : "+1 to point generation",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('a',12)},
        },
        14 :{
            title : "+1 again again",
            description : "+1 to point generation",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('a',13)},
        },
        15 :{
            title : "+1 again again again",
            description : "+1 to point generation",
            cost: new Decimal(4),
            unlocked() { return hasUpgrade('a',14)},
        },
        21 :{
            title : "+1 buyable",
            description : "Unlock the +1 Buyable",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('a',15)},
        },
        22 :{
            title : "+2",
            description : "+2 to point generation",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('a',21)},
        },
        23 :{
            title : "+2 again",
            description : "+2 to point generation",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('a',22)},
        },
        24 :{
            title : "+2 again again",
            description : "+2 to point generation",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('a',23)},
        },
        25 :{
            title : "+2 again again again",
            description : "+2 to point generation",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('a',24)},
        },
    },
    buyables : {
        11: {
            title: "+1 Buyable",
            cost(x) { return new Decimal(10).pow(x.pow(1.1)) },
            display() {
                return "Amount: "+formatWhole(getBuyableAmount('a', 11))+"<br> cost:"+format(tmp.a.buyables[11].cost)+ " Points"
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() { return hasUpgrade('a',21)},
        },
    },
    tabFormat: {
        "Upgrades": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",
                    function() { return 'You have ' + format(player.points) + ' points' },],
                "blank",
                "upgrades",
            ],
        },
        "Buyables": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                ["display-text",
                    function() { return 'You have ' + format(player.points) + ' points' },],
                "blank",
                "buyables",
            ],
            unlocked() { return hasUpgrade('a',21)},
        },
    },
    
    layerShown(){return true}
})
addLayer("e", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},
    name: "equality",
    symbol: "=",
    color: "#e8c500",                       // The color for this layer, which affects many elements.
    resource: "=",            // The name of this layer's main prestige resource.
    row: 0,           // The row this layer is on (0 is the first row).
    position:69,

    baseResource: "+",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(10),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})
