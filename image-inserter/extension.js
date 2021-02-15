// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const randomImageURL = require("./commands");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Getting User input - height
	let myCommand = vscode.commands.registerCommand('image-inserter.newRandomImageURL', randomImageURL);

	
	context.subscriptions.push(myCommand);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
