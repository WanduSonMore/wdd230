// Sets the current year
let year = new Date().getFullYear();
let currentYearSpan = document.querySelector("#currentYear")
currentYearSpan.innerHTML = `${year}`
// sets the last modify date
let lastModifyParagraph = document.getElementById("lastModified")
lastModifyParagraph.innerHTML = `Last Modified ${document.lastModified}`