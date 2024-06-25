document.addEventListener("DOMContentLoaded", () => {
    const visitMessage = document.getElementById('visitMessage')
    const lastVisit = localStorage.getItem('lastVisit')
    const now = Date.now()

    if (lastVisit) {
        const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24))

        if (daysBetween < 1) {
            visitMessage.textContent = "Back so soon! Awesome!"
        } else if (daysBetween === 1) {
            visitMessage.textContent = "You last visited 1 day ago."
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} days ago.`
        }
    } else {
        visitMessage.textContent = "Welcome! Let us know if you have any questions."
    }

    localStorage.setItem('lastVisit', now)
})
