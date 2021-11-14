let modInfo = {
	name: "Plus 1 Tree",
	id: "P1T",
	author: "RTXT25",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js","notifications.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "addition",
}

let changelog = `<h1>Changelog:</h1><br>
        <h3>v0.1 Addition</h3><br>
	        - Added Addition and notifications layer<br>
		- Also added Adition Upgrades and a buyable<br>
	<h3>v0.0</h3><br>
		- Created the thing`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return (hasUpgrade("a",11))
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)

	if (hasUpgrade("a",12)) gain = gain.add(1)
	if (hasUpgrade("a",13)) gain = gain.add(1)
	if (hasUpgrade("a",14)) gain = gain.add(1)
	if (hasUpgrade("a",15)) gain = gain.add(1)
	if (hasUpgrade("a",22)) gain = gain.add(2)

	gain = gain.add(getBuyableAmount('a', 11))

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
