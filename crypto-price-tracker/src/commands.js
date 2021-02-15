const vscode = require("vscode");
const fetch = require("node-fetch");

// Creating statusBarItem
var myStatusbarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
var Coin = "";
var VSCurrency = "";
var IntervalID = null;

// setter method for interval id
const setIntervalID = (id) => {
    IntervalID = id;
}

/**
 * setUserPerference - Stores coin and vsCurrency in globalState
 * @param {vscode.ExtensionContext} context
 */
const setUserPerference = async () => {
    console.log(" === setUserPerference() === ");
    // Get Coin
    const coinName = await vscode.window.showInputBox({
        "placeHolder": "Coin Name (ex. bitcoin)",
        "value": Coin
    });

    // Get VS_Currency
    const vsCurrency = await vscode.window.showInputBox({
        "placeHolder": "Currency (ex. usd)",
        "value": VSCurrency
    });

    // Setting the coin and vs currency name
    Coin = coinName;
    VSCurrency = vsCurrency;
}


/**
 * getCoinPrice: Get the price for a given coin in a currency
 */
const getCoinPrice = async () => {
    // Setting Command id for statusBarItem
    myStatusbarItem.command = "crypto-price-tracker.updateCoinPrice";

    if ((Coin === "" || Coin === undefined) || (VSCurrency === "" || VSCurrency === undefined)) {
        // Coin or VSCurrency not found!
        await setUserPerference(); // ask the user to set coin and vsCurrency
    }

    var url = `https://api.coingecko.com/api/v3/coins/${Coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

    fetch(url).then((response) => {
        return response.json();
    }).then((res) => {
        /**
         * Try Catch to prevent from crashing if the crypto or vs currency is not found 
         */
        try {
            // Getting price and percent change over last 1hr 
            var price = res["market_data"]["current_price"][VSCurrency];
            var price_change_percentage_1h_in_currency = res["market_data"]["price_change_percentage_1h_in_currency"][VSCurrency];

            // Add '+' to show positive change 
            if (price_change_percentage_1h_in_currency > 0) {
                price_change_percentage_1h_in_currency = "+" + price_change_percentage_1h_in_currency;
            }

            // Formatting Price
            price = new Intl.NumberFormat().format(price);

            // Setting StatuBar Item
            myStatusbarItem.text = `${Coin} | \$${price} ${VSCurrency} | ${price_change_percentage_1h_in_currency}\%`;
            myStatusbarItem.show();
        } catch (err) { // TypeError: Cannot read property 'VSCurrency' of undefined
            myStatusbarItem.hide();
            console.log("Crypto or VS Currency not valid!");
            console.error(err);
            vscode.window.showErrorMessage("Coin Name or Currency not found. Try again!");
        }
    }).catch((err) => {
        vscode.window.showErrorMessage("Unable to reach coingecko to get the most updated prices please try again later.");
        console.error(err);

        // Clearing interval
        clearInterval(IntervalID);
    });
}


// Updates the Coin Price
const updateCoinPrice = () => {
    getCoinPrice(); // load the price first 
}

// Exports
exports.getCoinPrice = getCoinPrice;
exports.updateCoinPrice = updateCoinPrice;
exports.setUserPerference = setUserPerference;
exports.setIntervalID = setIntervalID;

// EOF