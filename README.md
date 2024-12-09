1) Install Node.js https://nodejs.org/en
2) Clone the repository
3) Open CMD and in CMD navigate to <repository-cloned-location>/magic-repo/app
4) In CMD: npm i
5) Download the dataset from here(https://data.scryfall.io/default-cards/default-cards-20241204100728.json) then rename to default-cards.json
6) Open windows explorer, navigate to <repository-cloned-location>/magic-repo/app, and put default-cards.json into that location
7) In CMD: npm run dev
8) Head to any browser and go to "localhost:3000" for testing
9) In app: click the search bar and hit enter, the cards will load in
    
*Note: All of our written functional code is in app/app/page.tsx and app/app/api/path/route.ts. mtgproj.js was the one that was developed on before the front end was written and doesn't represent the most recent code.
