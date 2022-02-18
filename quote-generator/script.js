function loading() {
    const quoteContent = document.getElementById("quote-content")
    const loader = document.getElementById("loader")

    quoteContent.classList.add("d-none")
    loader.classList.remove("d-none")
}

function showQuote() {
    const loader = document.getElementById("loader")
    const quoteContent = document.getElementById("quote-content")

    loader.classList.add("d-none")
    quoteContent.classList.remove("d-none")
}
// Quote generator API
const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';



function changeQuote(quote, author) {
    document.getElementById("quoteText").innerHTML = quote;
    document.getElementById("author").innerHTML = author;
    document.getElementById("twitterSharelink").href = `https://twitter.com/intent/tweet?text="${quote}"  ${author}`
}


async function getQuote() {



    // trigger loading
    loading()

    try {
        const response = await fetch(url);
        const data = await response.json();

        changeQuote(data.quoteText, data.quoteAuthor);

        showQuote()

    } catch (error) {
        console.log(error)
        getQuote()
    }
}

function loadNewQuote() {
    loading()
    setTimeout(() => {
        getQuote()
    }, 3000)

}
newQuote.addEventListener("click", loadNewQuote)
getQuote()