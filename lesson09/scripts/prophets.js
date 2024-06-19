const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json'

const cards = document.querySelector('#cards')

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let newsection = document.createElement("section")
        newsection.innerHTML = `
                <h2>${prophet.name} ${prophet.lastname}</h2>
                <img src="${prophet.imageurl}" alt="${prophet.name} ${prophet.lastname}" loading="lazy" height="400" width="300">`
        cards.append(newsection)
    }) 
}

async function getProphetData() {
    const response = await fetch(url)
    if (response.ok){
        const data = await response.json()
        //console.table(data)// temporary testing of data retreival
        displayProphets(data.prophets)
    }
    else{
        console.log("This is not working")
    }
     
    
}
  
getProphetData();