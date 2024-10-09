/*Overall Pseudocode Explaining how this Page Functions:

Summary of Functionality:
Dynamic Listings: The system continuously adds new random freelancer listings every 5 seconds.
Average Calculation: The average starting price is updated in real time whenever a new freelancer is added.
Rendering: The listings and average price are displayed in an HTML table and updated each time a new listing is added.
DOM Manipulation: The code dynamically updates the content on the web page without needing to reload, using JavaScript to manipulate the DOM.*/












// #region State
// Declare an array of property codes to be used when accessing the properties of listing objects.
let listingPropertyCodes = ['name', 'occupation', 'startingPrice'];

// Initialize an array of freelancer listings, each represented by an object containing their name, occupation, and starting price.
let listings = [
    {
        name: 'Alice',
        occupation: 'Writer',
        startingPrice: 30,
    },
    {
        name: 'Bob',
        occupation: 'Teacher',
        startingPrice: 50,
    },
    {
        name: 'Carol',
        occupation: 'Programmer',
        startingPrice: 70,
    },
];

// Calculate the average starting price of freelancers using the initial listings.
let aveStartingPrice = calculateAveStartingPrice();

// Define arrays for random name, occupation, and starting price generation.
const NAMES = ['Annabeth', 'Troy', 'Brooke', 'Toby'];
const OCCUPATIONS = ['Clerk', 'Chef', 'Content Creator', 'UX Designer'];
const STARTING_PRICES = [30, 50, 70, 75, 90, 100, 120];

// Function to add a new random listing to the listings array and update the average starting price.
function addListing() {
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const occupation = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
    const startingPrice = STARTING_PRICES[Math.floor(Math.random() * STARTING_PRICES.length)];
    listings.push({ name, occupation, startingPrice });

    // Update the average starting price after adding a new listing.
    aveStartingPrice = calculateAveStartingPrice();
}

// Function to calculate the average starting price from the current listings.
function calculateAveStartingPrice() {
    const ave = listings.reduce((total, listing) => total += listing.startingPrice, 0) / listings.length;
    return Math.round(ave * 100) / 100; // Round to two decimal places.
}

// #region Render
// Function to render the average starting price and the list of freelancers in the HTML.
function render() {
    // Render average starting price by selecting the relevant DOM element and updating its content.
    const $aveStartingPrice = document.querySelector('#ave-starting-price');
    $aveStartingPrice.textContent = `The average starting price is $${aveStartingPrice}.`;

    // Render the table body for the freelancer listings.
    const $tableBody = document.querySelector('#freelancer-listings');

    // Create table rows for each listing and populate them with the corresponding data.
    const $tableContent = listings.map((listing) => {
        const $row = document.createElement('tr');
        const $rowContent = listingPropertyCodes.map((code) => {
            const $cell = document.createElement('td');
            $cell.textContent = listing[code]; // Fill each cell with the listing's data.
            return $cell;
        });
        $row.replaceChildren(...$rowContent); // Replace the row's content with the created cells.
        return $row; // Return the constructed row.
    });

    // Update the table body with the new rows.
    $tableBody.replaceChildren(...$tableContent);
}

// #region Script
// Set an interval to automatically add a new listing and render the updates every 5 seconds.
const intervalId = setInterval(() => {
    addListing();
    render();
}, 5000);

// Initial render call to display the current listings and average starting price.
render();