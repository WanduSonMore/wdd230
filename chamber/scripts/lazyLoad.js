document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('.lazy')

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target
                img.src = img.dataset.src
                img.onload = () => img.classList.add('lazy-loaded')
                observer.unobserve(img)
            }
        })
    }

    const observer = new IntersectionObserver(lazyLoad)

    lazyImages.forEach(img => {
        observer.observe(img)
    })
})
