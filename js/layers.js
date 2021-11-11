addLayer("+", {
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
            cost: new Decimal(1)
        },
        13 :{
            title : "+1 again",
            description : "+1 to point generation again",
            cost: new Decimal(2)
        },
        14 :{
            title : "+1 again again",
            description : "+1 to point generation again again",
            cost: new Decimal(2)
        },
        15 :{
            title : "+1 again again again",
            description : "+1 to point generation again again again",
            cost: new Decimal(3)
        },
        21 :{
            title : "+1 buyable",
            description : "Unlock the +1 Buyable",
            cost: new Decimal(3)
        },
    },
    buyables : {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            display() { return "<h1>+1 buyable</h1>" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    layerShown(){return true}
})
