const quoteContent = document.getElementById("quote-content")
const spinner = document.getElementById("loader")
// Quote generator API
const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';

//Display loading spinner
function displaySpinner() {
    quoteContent.classList.add("d-none")
    spinner.classList.remove("d-none")
}

//display Quote
function showQuote() {
    spinner.classList.add("d-none")
    quoteContent.classList.remove("d-none")
}


function changeQuote(quote, author) {
    document.getElementById("quoteText").innerHTML = quote;
    document.getElementById("author").innerHTML = author;
    document.getElementById("twitterSharelink").href = `https://twitter.com/intent/tweet?text="${quote}"  ${author}`;

    showQuote()
}


async function getQuote() {
    //display spinner 
    displaySpinner()

    try {

        const response = await fetch(url);
        const data = await response.json();
        changeQuote(data.quoteText, data.quoteAuthor);

    } catch (error) {
        console.log(error)
        getQuote()
    }
}

function loadNewQuote() {
    displaySpinner()

    // load 1 quote every 3 seconde
    setTimeout(() => {
        getQuote()
    }, 3*1000)

}
newQuote.addEventListener("click", loadNewQuote)


getQuote()