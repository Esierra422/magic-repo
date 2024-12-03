const fs = require('fs');
const path = require('path');

// Function to search for a card by name in the JSON file
function getCardInfo(name, jsonFile = path.join(__dirname, 'default-cards.json')) {
    try {
        const fileContent = fs.readFileSync(jsonFile, { encoding: 'utf-8' });
        const cards = JSON.parse(fileContent);

        let cardNotFound = true;

        for (let i = 0; i < cards.length; i++) {
            if (cards[i].name === name) {
                const price = cards[i]['prices']['usd'];
                const imageUrl = cards[i]['image_uris']['png'] || "Image not available";

                if (price === null) continue; // if price is null don't print info

                //temp
                // collection.push({
                //     name: cards[i].name,
                //     price: cards[i]['prices']['usd'],
                //     set: cards[i]['set_name'],
                // });
                //temp

                console.log(`Card found: ${cards[i].name}`);
                console.log(`Price (USD): ${price}`);
                console.log(`Set: ${cards[i]['set_name']}`);
                console.log(`Picture: ${imageUrl}`);
                console.log('\n');
                cardNotFound = false;
            }
        }

        if (cardNotFound) {
            console.log(`Card ${name} not found in file.`);
            return null;
        }
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        return null;
    }
}

function mergeSortByPrice(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);

    return mergeByPrice(mergeSortByPrice(leftArr), mergeSortByPrice(rightArr));

}

function mergeByPrice(leftArr, rightArr){
    const sortedArr = [];

    while(leftArr.length && rightArr.length){
        if(leftArr[0].price < rightArr[0].price){
            sortedArr.push(leftArr.shift());
        }
        else {
            sortedArr.push(rightArr.shift());
        }
    }
    return [...sortedArr, ...leftArr, ...rightArr];
}

function mergeSortByName(arr) {
    if (arr.length < 2) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);

    return mergeByName(mergeSortByName(leftArr), mergeSortByName(rightArr));

}

function mergeByName(leftArr, rightArr){
    const sortedArr = [];

    while(leftArr.length && rightArr.length){
        if(leftArr[0].name < rightArr[0].name){
            sortedArr.push(leftArr.shift());
        }
        else {
            sortedArr.push(rightArr.shift());
        }
    }
    return [...sortedArr, ...leftArr, ...rightArr];
}
const collection = [
    { name: "Sol Ring", price: 1.53 },
    { name: "Black Lotus", price: 17250.00 },
    { name: "Doubling Season", price: 48.75 },
    { name: "Force of Will", price: 99.99 },
    { name: "Volrath's Stronghold", price: 21.75 }
];

// Sort by price ascending
const sortedCollectionPrice = mergeSortByPrice(collection);
// sortedCollectionPrice.reverse(); // switch to descending
console.log(sortedCollectionPrice);

// Sort by name ascending
const sortedCollectionName = mergeSortByName(collection);
// sortedCollectionName.reverse(); // switch to descending
console.log(sortedCollectionName);

//TEST THE FUNCTION
//void getCardInfo("Sol Ring");
/*collection.sort((a, b) => a.price - b.price);
collection.reverse();*/
// for(let i = 0; i < collection.length; i++) {
//     console.log(collection[i]);
//     console.log("\n");
// }

// Search for a card by name
async function searchSpecificCardName(cardName) {
    try {
        // Format the query for the API search endpoint
        const apiUrl = `https://api.scryfall.com/cards/search?q=name:"${cardName}"&unique:prints`;

        // Make the API request
        const response = await fetch(apiUrl);

        // Check if the response is OK
        if (!response.ok)
            console.error(`error! Status: ${response.status}`);

        // Parse the response
        const data = await response.json();

        // Check if there are cards in the results
        for (let i = 0; i < data.data.length; i++) {
            let card = data.data[i];

            // Print relevant card details
            console.log(`Card found: ${card.name}`);
            console.log(`Price (USD): ${card['prices']['usd']}`);
        }

    } catch (error) {
        console.error("Error fetching card data:", error.message);
    }
}

//auto complete functionality for search bar
async function searchAutoComplete(cardName){
    try {
        // Format the query for the API search endpoint
        const autoCompleteUrl = `https://api.scryfall.com/cards/autocomplete?q=${cardName}`;

        // Make the API request
        const response = await fetch(autoCompleteUrl);

        // Check if the response is OK
        if (!response.ok)
            console.error(`error! Status: ${response.status}`);

        const data = await response.json();

        console.log(data);

    } catch (error) {
        console.error("Error fetching card data:", error.message);
    }
}

//void searchSpecificCardName("Sol Ring");
//void searchSpecificCardName("Command Tower");

// TO DO
// 1) search for a card
// 2) click on a card
// 3) return card object (name, value, set)
// 4) addToCollection takes card object and places into obj array





//void searchAutoComplete("Command T");