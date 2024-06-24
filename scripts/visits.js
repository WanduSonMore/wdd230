let visits = getNumberOfVisits()
let visitsSpan = document.getElementById("visits")
visitsSpan.innerText = visits

function getNumberOfVisits(){
    let visitcount = localStorage.getItem("site-visits")
    if (visitcount == null){
        visitcount = 0
    }
    else{
        visitcount = parseInt(visitcount)
    }
    visitcount = visitcount + 1
    localStorage.setItem("site-visits",`${visitcount}`)
    return visitcount
}