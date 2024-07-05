// Toggle active/not active buttons

var gridSelector = document.querySelector('#directory-grid');
var listSelector = document.querySelector('#directory-list');
var directoryData = document.querySelector('#directory-data');

gridSelector.addEventListener('click', ()=>{
    if (!gridSelector.classList.contains('active')){    
        gridSelector.classList.add('active');
        listSelector.classList.remove('active');
        directoryData.classList.add('directory-cards');
        directoryData.classList.remove('directory-list');
        displayMembers('grid');
    }
});

listSelector.addEventListener('click', ()=>{
    if (!listSelector.classList.contains('active')){
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
        if(view === 'grid') {
          card.innerHTML = `
          <div class="directory-item">
            <img src="${business.imageURL}">
            <div class="directory-item-details">
              <p>${business.name}</p>
              <p>${business.streetAddress}</p>
              <p>${business.cityStateZip}</p>
              <p><a class="card-button" href="${business.websiteURL}" target="_blank">Website</a></p>
            </div>
          </div>
          `;
        } else {
          card.innerHTML = `
          <div class="directory-item list-view">
            <div class="directory-item-details side-by-side">
              <p>${business.name}</p>
              <p>${business.streetAddress}</p>
              <p>${business.cityStateZip}</p>
              <p><a class="card-button" href="${business.websiteURL}" target="_blank">Website</a></p>
            </div>
          </div>
          `;
        }
        cards.appendChild(card);
      }); // end of forEach loop
    })
    .catch(error => {
      console.error("There was an error loading the data.");
      cards.innerHTML = "<section><h1>There was an error loading the data</h1></section>";
    });
}; // end of function expression

// Initial load in grid view
displayMembers('grid');
