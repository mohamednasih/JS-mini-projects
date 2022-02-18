function loading() {
    const quoteContent = document.getElementById("quote-content")
    const loader = document.getElementById("loader")

    quoteContent.classList.add("d-none")
    loader.classList.remove("d-none")
}

function showQuote(){
    const loader = document.getElementById("loader")
    const quoteContent = document.getElementById("quote-content")

    loader.classList.add("d-none")
    quoteContent.classList.remove("d-none")
}
loading();
setTimeout(showQuote,1500)