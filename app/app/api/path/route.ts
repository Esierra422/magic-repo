"use server";

import fs = require('fs');
import path = require('path');
import https = require('https');

const outerCollection = [];
var decider = 0;

export async function checkForFile(){
    if (fs.existsSync("./default-cards.json")){
        return;
    } else{
        https.get('https://data.scryfall.io/default-cards/default-cards-20241204100728.json', (a) => {
            const streamCards = fs.createWriteStream("./default-cards.json");
            a.pipe(streamCards);
            streamCards.on("finish", () => {streamCards.close();});
        });
    }
}

// Function to search for a card by name in the JSON file
export async function getCardInfo(jsonFile = './default-cards.json') {
    await checkForFile();
    try {
        //read the file
        const fileContent = fs.readFileSync(jsonFile, { encoding: 'utf-8' });

        const cards = JSON.parse(fileContent);

        let cardNotFound = true;

        //iterate through list, if card names match - fetch price and imageURL
        for (let i = 0; i < cards.length; i++) {
            const price = cards[i]['prices']['usd'];
            const imageUrl = cards[i]['image_uris']?.['png'] || "Image not available";

            if (price === null) continue; // if price is null don't print info

            //temp - automatically adds all results to collection list
            outerCollection.push({
                id: cards[i].id,
                name: cards[i].name,
                price: cards[i]['prices']['usd'],
                set: cards[i]['set_name'],
                image: imageUrl
            });
            //temp
            // console.log(`Card found: ${cards[i].name}`);
            // console.log(`Price (USD): ${price}`);
            // console.log(`Set: ${cards[i]['set_name']}`);
            // console.log(`Picture: ${imageUrl}`);
            // console.log('\n');
            // cardNotFound = false;
        }
        decider = 1;
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        return null;
    }
}

export async function GET(){
  if (decider == 0){
    await getCardInfo();
  }
  return Response.json(outerCollection);
}