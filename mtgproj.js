const fs = require('fs');
const path = require('path');

const collection = [];
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
                collection.push({
                    name: cards[i].name,
                    price: cards[i]['prices']['usd'],
                    set: cards[i]['set_name'],
                });
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

//TEST THE FUNCTION
void getCardInfo("Sol Ring");
/*collection.sort((a, b) => a.price - b.price);
collection.reverse();*/
for(let i = 0; i < collection.length; i++) {
    console.log(collection[i]);
    console.log("\n");
}

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