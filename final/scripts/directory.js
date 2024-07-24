// Toggle active/not active buttons
var gridSelector = document.querySelector('#directory-grid');
var listSelector = document.querySelector('#directory-list');
var directoryData = document.querySelector('#directory-data');
const BASKET_KEY = "itemBasket";
const PRICE_KEY = "totalPrice";
let itemBasket = getItemBasketFromStorage();
let totalPrice = getTotalPriceFromStorage();

// Event listeners for view toggling
gridSelector.addEventListener('click', () => {
    if (!gridSelector.classList.contains('active')) {
        gridSelector.classList.add('active');
        listSelector.classList.remove('active');
        directoryData.classList.add('directory-cards');
        directoryData.classList.remove('directory-list');
        displayMembers('grid');
    }
});

listSelector.addEventListener('click', () => {
    if (!listSelector.classList.contains('active')) {
        listSelector.classList.add('active');
        gridSelector.classList.remove('active');
        directoryData.classList.add('directory-list');
        directoryData.classList.remove('directory-cards');
        displayMembers('list');
    }
});

// Load JSON data and display members
const url = "./data/members.json";

const displayMembers = (view) => {
    const cards = document.querySelector("#directory-data"); // select the output container element
    cards.innerHTML = ''; // Clear previous content

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.members.forEach((business) => {
                let card = document.createElement("section");
                if (view === 'grid') {
                    card.innerHTML = `
                    <div class="directory-item">
                        <img class="directory-image" src="${business.imageURL}" alt="placeholder image" loading="lazy" height="800" width="400">
                        <div class="directory-item-details">
                            <p>${business.name}</p>
                            <p>Price: ${business.price}</p>
                            <button class="add-button" data-name="${business.name}" data-price="${business.price}" type="submit">Add to Basket</button>
                        </div>
                    </div>
                    `;
                } else {
                    card.innerHTML = `
                    <div class="list-view">
                        <div class="directory-item-details side-by-side">
                            <p>${business.name}</p>
                            <p>Price: ${business.price}</p>
                            <button class="add-button" data-name="${business.name}" data-price="${business.price}" type="submit">Add to Basket</button>
                        </div>
                    </div>
                    `;
                }
                cards.appendChild(card);
            });

            // Add event listeners to new buttons
            document.querySelectorAll('.add-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const itemName = event.target.getAttribute('data-name');
                    const itemPrice = parseFloat(event.target.getAttribute('data-price'));
                    addItemToBasket(itemName, itemPrice);
                });
            });
        })
        .catch(error => {
            console.error("There was an error loading the data.");
            cards.innerHTML = "<section><h1>There was an error loading the data</h1></section>";
        });
};

// Add item to the basket
function addItemToBasket(name, price) {
    if (!itemBasket.find(item => item.name === name)) {
        itemBasket.push({ name, price });
        totalPrice += price;
        updateLocalStorage();
        addItemToList(name);
    }
}

// Update localStorage
function updateLocalStorage() {
    localStorage.setItem(BASKET_KEY, JSON.stringify(itemBasket));
    localStorage.setItem(PRICE_KEY, JSON.stringify(totalPrice));
}

// Retrieve item basket from localStorage
function getItemBasketFromStorage() {
    let basketString = localStorage.getItem(BASKET_KEY);
    return basketString ? JSON.parse(basketString) : [];
}

// Retrieve total price from localStorage
function getTotalPriceFromStorage() {
    let priceString = localStorage.getItem(PRICE_KEY);
    return priceString ? JSON.parse(priceString) : 0;
}

// Add item to the list
function addItemToList(item) {
    const myList = document.getElementById('list');
    let newItem = document.createElement("li");

    let deleteButton = document.createElement("button");

    newItem.innerText = item;
    newItem.setAttribute("item", item);

    deleteButton.innerText = '❌';
    deleteButton.addEventListener('click', () => {
        let itemToRemove = itemBasket.find(x => x.name === item);
        if (itemToRemove) {
            itemBasket = itemBasket.filter(x => x.name !== item);
            totalPrice -= itemToRemove.price;
            updateLocalStorage();
            newItem.remove();
            updateTotalPriceDisplay();
        }
    });

    newItem.append(deleteButton);
    myList.append(newItem);

    // Update total price display
    updateTotalPriceDisplay();
}

// Update total price display
function updateTotalPriceDisplay() {
    const priceDisplay = document.getElementById('total-price');
    if (priceDisplay) {
        priceDisplay.innerText = `Total Price: ${totalPrice} caps`;
    }
}

// Clear item basket
function clearBasket() {
    itemBasket = [];
    totalPrice = 0;
    updateLocalStorage();
    updateTotalPriceDisplay();
    document.getElementById('list').innerHTML = ''; // Clear the list
}

// Add event listener for "Purchase" button
document.getElementById('purchase-button').addEventListener('click', clearBasket);

// Initial load in grid view
displayMembers('grid');
updateTotalPriceDisplay();
