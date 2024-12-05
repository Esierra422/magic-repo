"use client";

import Image from "next/image";
import { useState, createElement, useEffect } from 'react';

let initalized = false;
let collectedCards = [];
// const testingDataSet = [
//   { id: 1, name: "Black Lotus", image: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg?1614638838", price: 99999.99 },
//   { id: 2, name: "Time Walk", image: "https://cards.scryfall.io/large/front/7/0/70901356-3266-4bd9-aacc-f06c27271de5.jpg?1614638832", price: 19999.95 },
//   { id: 3, name: "Ancestral Recall", image: "https://cards.scryfall.io/large/front/2/3/2398892d-28e9-4009-81ec-0d544af79d2b.jpg?1614638829", price: 16999.89 },
//   { id: 4, name: "Mox Pearl", image: "https://cards.scryfall.io/large/front/e/d/ed0216a0-c5c9-4a99-b869-53e4d0256326.jpg?1614638847", price: 9999.75 },
//   { id: 5, name: "Mox Sapphire", image: "https://cards.scryfall.io/large/front/e/a/ea1feac0-d3a7-45eb-9719-1cdaf51ea0b6.jpg?1614638862", price: 10999.50 },
//   { id: 6, name: "Mox Jet", image: "https://cards.scryfall.io/large/front/5/f/5f6927e1-c580-483a-8e2a-6e2deb74800e.jpg?1614638844", price: 9499.95 },
//   { id: 7, name: "Mox Ruby", image: "https://cards.scryfall.io/large/front/4/5/45fd6e91-df76-497f-b642-33dc3d5f6a5a.jpg?1682386918", price: 9999.99 },
//   { id: 8, name: "Mox Emerald", image: "https://cards.scryfall.io/large/front/a/c/aced2c55-7543-4076-bcdd-36c4d649b8ae.jpg?1614638841", price: 8999.89 },
//   { id: 9, name: "Lightning Bolt", image: "https://cards.scryfall.io/large/front/7/7/77c6fa74-5543-42ac-9ead-0e890b188e99.jpg?1706239968", price: 2.75 },
//   { id: 10, name: "Counterspell", image: "https://cards.scryfall.io/large/front/4/f/4f616706-ec97-4923-bb1e-11a69fbaa1f8.jpg?1726837907", price: 3.50 },
//   { id: 11, name: "Wrath of God", image: "https://cards.scryfall.io/large/front/5/3/537d2b05-3f52-45d6-8fe3-26282085d0c6.jpg?1697121198", price: 15.00 },
//   { id: 12, name: "Demonic Tutor", image: "https://cards.scryfall.io/large/front/a/2/a24b4cb6-cebb-428b-8654-74347a6a8d63.jpg?1701989302", price: 25.00 },
//   { id: 13, name: "Sol Ring", image: "https://cards.scryfall.io/large/front/8/2/82f1a8a3-7fdb-49a3-9649-b5c0b4755cd5.jpg?1726284526", price: 2.00 },
//   { id: 14, name: "Force of Will", image: "https://cards.scryfall.io/large/front/8/9/89f612d6-7c59-4a7b-a87d-45f789e88ba5.jpg?1675199280", price: 119.99 },
//   { id: 15, name: "Mana Crypt", image: "https://cards.scryfall.io/large/front/4/d/4d960186-4559-4af0-bd22-63baa15f8939.jpg?1727298349", price: 159.99 },
//   { id: 16, name: "Sword of Fire and Ice", image: "https://cards.scryfall.io/large/front/2/6/2626d4c9-fcef-4057-a154-7d987a4a4b84.jpg?1599710057", price: 79.99 },
//   { id: 17, name: "Tarmogoyf", image: "https://cards.scryfall.io/large/front/6/9/69daba76-96e8-4bcc-ab79-2f00189ad8fb.jpg?1619398799", price: 49.95 },
//   { id: 18, name: "Jace, the Mind Sculptor", image: "https://cards.scryfall.io/large/front/c/8/c8817585-0d32-4d56-9142-0d29512e86a9.jpg?1598304029", price: 149.99 },
//   { id: 19, name: "Liliana of the Veil", image: "https://cards.scryfall.io/large/front/d/1/d12c8c97-6491-452c-811d-943441a7ef9f.jpg?1673307126", price: 139.99 },
//   { id: 20, name: "Snapcaster Mage", image: "https://cards.scryfall.io/large/front/7/e/7e41765e-43fe-461d-baeb-ee30d13d2d93.jpg?1547516526", price: 49.99 },
// ];

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
        if(Number(leftArr[0].price )< Number(rightArr[0].price)){
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
// const collection = [
//     { name: "Sol Ring", price: 1.53 },
//     { name: "Black Lotus", price: 17250.00 },
//     { name: "Doubling Season", price: 48.75 },
//     { name: "Force of Will", price: 99.99 },
//     { name: "Volrath's Stronghold", price: 21.75 }
// ];

// Sort by price ascending
// const sortedCollectionPrice = mergeSortByPrice(collection);
// // sortedCollectionPrice.reverse(); // switch to descending
// console.log(sortedCollectionPrice);

// // Sort by name ascending
// const sortedCollectionName = mergeSortByName(collection);
// // sortedCollectionName.reverse(); // switch to descending
// console.log(sortedCollectionName);

// heapify function for heapSort
function heapify(collection, numCards, i) {

    let maxNodeIndex = i;
    let left = (2*i) +1;
    let right = (2*i) +2;

    // If left node exists and is greater than the max/root node, we found a new max
    if (left < numCards && Number(collection[left].price) > Number(collection[maxNodeIndex].price))
        maxNodeIndex = left;

    // If right node exists and is greater than the max/root node, we found a new max
    if (right < numCards && Number(collection[right].price) > Number(collection[maxNodeIndex].price))
        maxNodeIndex = right;

    if (maxNodeIndex !== i) {
        //swap and recursively heapify
        [collection[i], collection[maxNodeIndex]] = [collection[maxNodeIndex], collection[i]];
        heapify(collection, numCards, maxNodeIndex);
    }
}

function heapSort(collection) {
    const numCards = collection.length;

    // Build the max heap
    for (let i = Math.floor(numCards / 2) - 1; i >= 0; i--)
        heapify(collection, numCards, i);

    // One by one extract an element from heap
    for (let i = numCards - 1; i > 0; i--) {

        // Move current root to end
        [collection[0], collection[i]] = [collection[i], collection[0]];

        // Call max heapify on the reduced heap
        heapify(collection, i, 0);
    }
    return collection;
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

        const tempCollection = [];

        // Check if there are cards in the results
        for (let i = 0; i < data.data.length; i++) {
            let card = data.data[i];

            // Save relevant cards into a temporary array
            tempCollection.push({name: card.name, price: card.price});
        }
        return tempCollection;

    } catch (error) {
        console.error("Error fetching card data:", error.message);
    }
}

//auto complete functionality for search bar
async function searchAutoComplete(cardName){
    try {
        // Format the query for the API search endpoint
        const autoCompleteUrl = `https://api.scryfall.com/cards/autocomplete?q="${cardName}"`;

        // Make the API request
        const response = await fetch(autoCompleteUrl);

        // Check if the response is OK
        if (!response.ok)
            console.error(`error! Status: ${response.status}`);

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error fetching card data:", error.message);
    }
}

//void searchSpecificCardName("Sol Ring");

// TO DO - add to collection functionality
// 1) search for a card
// 2) click on a card
// 3) return card object (name, value, set)
// 4) take card object and places into obj array 'collection'
// 5) give user option to sort cards based on two options (heap sort and merge sort)


export default function Home() {

  const [elements, setElements] = useState([]);
  const [mainArray, setMainArray] = useState([]);
  const [collection, setCollection] = useState([]);
  const [collectionElements, setCollectionElements] = useState([]);
  const [page, setPage] = useState(0);
  const [card, setCard] = useState([]);
  const [total, setTotal] = useState(0);
  const [sortTrack, setSortTrack] = useState([0,0,0,0]);
  const [sortingSpeed, setSortingSpeed] = useState(0);
  const [collectionSortSpeed, setCollectionSortSpeed] = useState(0);
  const [searchCrit, setSearchCrit] = useState("");
  const [searching, setSearching] = useState(false);

  // Gets the data array from the server file P.S. this is completely broken and the worst code I have every seen/written. I spent over 4 hours and nearly every resource on the internet to try to get mainArray to remember its 
  // value like useState is supposed but it simply won't(or find an alternate way to do this for that matter). This led me to resorting to this mess running everytime mainArray experiences an update which happens a ton per second.
  // I made it better by not having to form the array everytime from scratch in the server file but still utterly horrible.
  useEffect(() => {
    const dataArray = async () =>{
      const dataArrayR = await fetch('/api/path');
      var moreDataArrayR = await dataArrayR.json();
      if (searching == true){
        var veryTempArray = [];
        for (var i = 0; i < moreDataArrayR.length; i++){
          if (moreDataArrayR[i].name.match(new RegExp(searchCrit, 'gi'))){
            veryTempArray.push(moreDataArrayR[i]);
          }
        }
        moreDataArrayR = veryTempArray;
      }
      if (sortTrack[0] == 1){
        const startTime = performance.now();
        moreDataArrayR = await heapSort(moreDataArrayR).reverse();
        const endTime = performance.now();
        setSortingSpeed(endTime-startTime);
      } else if (sortTrack[1] == 1){
        const startTime = performance.now();
        moreDataArrayR = await heapSort(moreDataArrayR);
        const endTime = performance.now();
        setSortingSpeed(endTime-startTime);
      } else if (sortTrack[2] == 1){
        const startTime = performance.now();
        moreDataArrayR = await mergeSortByPrice(moreDataArrayR).reverse();
        const endTime = performance.now();
        setSortingSpeed(endTime-startTime);
      } else if (sortTrack[3] == 1){
        const startTime = performance.now();
        moreDataArrayR = await mergeSortByPrice(moreDataArrayR);
        const endTime = performance.now();
        setSortingSpeed(endTime-startTime);
      }
      setElements(displayCards(moreDataArrayR));
      setMainArray(moreDataArrayR);
      };  
      dataArray();
  }, [mainArray, elements]);


  // Loads the selected card's data into the cards variable
  function pullUpCard(cardName){
    for (let i = 0; i < mainArray.length; i++){
      if (mainArray[i].id == cardName){
        setCard(mainArray[i]);
        setPage(3);
      }
    }
  }

  // Creates a React componenent and attaches it to the parent component.
  function displayCards(cardArray){
    const cardsList = cardArray.map((card) => 
      <li key={Math.floor(Math.random() * 1000000001)}>
        <button onClick={() => pullUpCard(card.id)} className={`border-4 h-78 w-56 border-black bg-cover hover:border-red-500`}>
          <img
            src={card.image}
          />
        </button>
      </li>
    );
    //Limit the drawing to 50 cards
    const tempArray = [];
    for (var l = 0; l < Math.min(cardArray.length, 50); l++){
      tempArray.push(cardsList[l]);
    }
    return tempArray;
  }

  function sortDescendingHeap(arr){
    setSortTrack([1,0,0,0]);
  }
  function sortAscendingHeap(arr){
    setSortTrack([0,1,0,0]);
  }
  function sortDescendingMerge(arr){
    setSortTrack([0,0,1,0]);
  }
  function sortAscendingMerge(arr){
    setSortTrack([0,0,0,1]);
  }

  function changePage(pageNum){
    setPage(pageNum);
  }

  function priceCalc(mainCol){
    setTotal(() => {
      let totalTemp = 0;
      for (let i = 0; i < mainCol.length; i++){
        totalTemp += Number(mainCol[i].price);
      }
      return totalTemp;
    });
    return total;
  }

  // Add a card to the collection array
  function addToCollection(){
    setCollection((a) => {
      const newTempArray = [...a, card];
      setCollectionElements(displayCards(newTempArray));
      priceCalc(newTempArray);
      return newTempArray;
    });

  }

  function searchForCard(searchCriteria){
    if (searchCriteria == ""){
      setSearching(false);
      return;
    }
    setSearching(true);
  }

  // Remove a card from the collection array
  function removeFromCollection(){
    for (let i = 0; i < collection.length; i++){
      if (collection[i].name == card.name){
        setCollection(() => {
          let newTempArray = collection.toSpliced(i, 1);
          setCollectionElements(displayCards(newTempArray));
          priceCalc(newTempArray);
          return newTempArray;
        });
      }
    }
  }

  // Clear all cards from the collection
  function clearCollection(){
    setCollection([]);
    setCollectionElements([]);
    priceCalc([]);
  }

  // Display all the cards in the array when project is initally launched.
  if (initalized == false){
    setElements(displayCards(collection));
    initalized = true;
  }
  if (page == 0){
    // Initial page
    return (
      <div className="min-h-screen flex flex-row lg:flex-col">
        <div className="grid grid-cols-11 bg-black text-white p-4">
          <h1 className="text-xl col-start-1">
            TCG Card Collector
          </h1>
          <button onClick={() => changePage(1)} className="col-start-2 text-m hover:text-red-500 inset-x-0 p-2 text-white font-bold">
            Your Collection
          </button>
          <div className="p-4 col-start-10 text-white justify-right text-sm text-center">
            Time Taken to Sort: {sortingSpeed} ms
          </div>
        </div>
        <div name="stuff" className="grid grid-cols-7 min-h-screen bg-gray-100 p-8 gap-8 content-start">
          <div className="col-span-5">
            <input
              type="text"
              className="w-full p-2 bg-gray-100 border border-black rounded-full focus:ring-2 focus:border-red-500 text-black"
              placeholder="Search..."
              onChange={(k) => setSearchCrit(k.target.value)}
              onKeyDown={(async (e) => {
                  if (e.key == "Enter"){
                    searchForCard(searchCrit);
                  }
              })}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <button onClick={sortDescendingHeap} className="bg-black hover:text-red-500">
            Price Descending/Heap
            </button>
            <button onClick={sortAscendingHeap} className="bg-black hover:text-red-500">
            Price Ascending/Heap
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            <button onClick={sortDescendingMerge} className="bg-black hover:text-red-500">
            Price Descending/Merge
            </button>
            <button onClick={sortAscendingMerge} className="bg-black hover:text-red-500">
            Price Ascending/Merge
            </button>
          </div>
        {elements}
        </div>
        <div className="bg-gray-800 text-white p-4 lg:h-1/4">
        </div>
    </div>
    );
  } else if (page == 1){
      // Collection page
      return (
        <div className="min-h-screen flex flex-row lg:flex-col">
          <div className="grid grid-cols-11 bg-black text-white p-4">
            <h1 className="col-start-1 text-xl">
              TCG Card Collector
            </h1>
            <button onClick={() => changePage(0)} className="cols-start-2 hover:text-red-500 inset-x-0 p-2 text-white font-bold">
              All Cards
            </button>
          </div>
          <div className="flex place-content-between whitespace-pre p-4 col-span-7">
            <div className="font-bold text-white">
              Price Total: ${total}
            </div>
            <div className="font-bold text-white">
              Total Card Count: {collection.length}
            </div>
            <div className="flex flex-col space-y-2">
          </div>
            <button onClick={clearCollection} className="bg-black hover:text-red-500">
              Clear Collection
            </button>
          </div>
          <div name="stuff" className="grid grid-cols-7 min-h-screen bg-gray-100 p-8 gap-8 content-start">
            {collectionElements}
          </div>
          <div className="bg-gray-800 text-white p-4 lg:h-1/4">
          </div>
      </div>
      );
  } else {
      // Singe card page
      return (
        <div className="min-h-screen flex flex-row lg:flex-col">
          <div className="bg-black text-white p-4">
            <h1 className="text-xl">
              TCG Card Collector
            </h1>
            <button onClick={() => changePage(0)} className="hover:text-red-500 inset-x-0 p-2 text-white font-bold">
              All Cards
            </button>
            <button onClick={() => changePage(1)} className="hover:text-red-500 inset-x-0 p-2 text-white font-bold">
              Your Collection
            </button>
          </div>
          <div name="stuff" className="grid grid-cols-5 min-h-screen bg-gray-100 p-8 gap-8 content-start">
            <button disabled={true} className="border-4 h-auto w-auto border-black col-start-2 ">
              <img
                src={card.image}
              />
            </button>
            <div className="whitespace-pre text-black font-bold text-2xl">
              {card.name}
              <br/>
              Price: ${card.price}
              <br/>
              <button onClick={addToCollection} className="p-2 bg-black text-white hover:text-red-500">
                Add to Collection
              </button>
              <button onClick={removeFromCollection} className="p-2 bg-black text-white hover:text-red-500">
                Remove from Collection
              </button>
            </div>
          </div>
          <div className="bg-gray-800 text-white p-4 lg:h-1/4">
          </div>
        </div>
      );
  }
  
}