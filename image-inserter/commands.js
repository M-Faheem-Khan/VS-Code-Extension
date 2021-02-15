/**
 * @author Muhammad F. Khan
 * @desc 
 */
const vscode = require('vscode');

// Gets Image Dimensions
const randomImageURL = async () => {

    // Getting user input
    const imageDimensions = await vscode.window.showInputBox({
        "placeHolder": "Enter image height and width(height width)"
    });

    // split at ' '
    var delimiter = imageDimensions.indexOf(" ");
    var height = imageDimensions.substr(0, delimiter); // for loop
    var width = imageDimensions.substr(delimiter + 1, imageDimensions.length);

    // Creating url
    var url = `https://source.unsplash.com/random/${width}x${height}`;


    // Getting current editor
    var activeEditor = vscode.window.activeTextEditor;

    // Checking if anything is selected
    if (activeEditor.selection.isEmpty) {
        // the Position object gives you the line and character where the cursor is
        const position = activeEditor.selection.active;

        // Inserting the url
        activeEditor.edit((edit) => {
            edit.insert(position, url);
        })

    }

}

// Exporting function
module.exports = randomImageURL;