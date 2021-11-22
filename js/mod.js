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
	num: "0.3",
	name: "1+1×1= new Version",
}

let changelog = `<h1>Changelog:</h1><br>
		<h3>v0.3 1+1×1= new Version</h3><br>
		- Added × Layer (It Does Nothing)<br>
		- Added Some + Upgrades and A Buyable<br>
		- Gave = Functionality<br>
		- Added A Line<br>
		<br>
        <h3>v0.2.2 Equality</h3><br>
	        - Actual Fixed = position (it still does nothing)<br>
		<br>
        <h3>v0.2.1 Equality</h3><br>
	        - Fixed = colo(u)r and position (it still does nothing)<br>
		<br>
        <h3>v0.2 Equality</h3><br>
	        - Added = layer (it does nothing)<br>
		<br>
        <h3>v0.1 Addition</h3><br>
	        - Added + and notifications layer<br>
		- Also added + Upgrades and a + buyable<br>
		<br>
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
	let m11 = new Decimal(1).times(getBuyableAmount('m',11))

	if (hasUpgrade("a",12)) gain = gain.add(1)
	if (hasUpgrade("a",13)) gain = gain.add(1)
	if (hasUpgrade("a",14)) gain = gain.add(1)
	if (hasUpgrade("a",15)) gain = gain.add(1)
	if (hasUpgrade("a",22)) gain = gain.add(2)
	if (hasUpgrade("a",23)) gain = gain.add(2)
	if (hasUpgrade("a",24)) gain = gain.add(2)
	if (hasUpgrade("a",25)) gain = gain.add(2)
	if (hasUpgrade("a",32)) gain = gain.add(3)
	if (hasUpgrade("a",33)) gain = gain.add(3)
	if (hasUpgrade("a",34)) gain = gain.add(3)
	if (hasUpgrade("a",35)) gain = gain.add(3)
	if (hasUpgrade("a",99)) gain = gain.add(2)

	gain = gain.add(getBuyableAmount('a', 11))
	gain = gain.add(getBuyableAmount('a', 12))
	gain = gain.add(getBuyableAmount('a', 12))

	gain = gain.add(m11)

	if (hasMilestone("e",0)) gain = gain.times(player.e.points).add(1)

	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [ "endgame at Unlock ×"
]

// Determines when the game "ends"
function isEndgame() {
	return player.e.points.gte(new Decimal("69"))
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
