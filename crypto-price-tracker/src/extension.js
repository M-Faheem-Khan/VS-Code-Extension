const vscode = require('vscode');

// Importing Commands
const { getCoinPrice, updateCoinPrice, setUserPerference, setIntervalID } = require("./commands");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log("Extension: crypto-price-tracker has been activated!");	
	
	console.log("Registering Commands");
	// Registering Commands
	let getCoinPriceCommand = vscode.commands.registerCommand('crypto-price-tracker.getCoinPrice', getCoinPrice);
	let updateCoinPriceCommand = vscode.commands.registerCommand('crypto-price-tracker.updateCoinPrice', updateCoinPrice);
	let setUserPerferenceCommand = vscode.commands.registerCommand('crypto-price-tracker.setUserPerference', setUserPerference);


	// Subscribing Commands
	context.subscriptions.push(getCoinPriceCommand); // getCoinPrice
	context.subscriptions.push(updateCoinPriceCommand); // status bar item example
	context.subscriptions.push(setUserPerferenceCommand); // set user preference


	var intervalID = setInterval(updateCoinPrice, 30000); // update coin price every 30 seconds

	setIntervalID(intervalID); // setting interval id;

	
}



// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate,
}
