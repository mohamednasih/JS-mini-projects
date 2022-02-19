const Key = "wskFxiBTVz3XE7ait_CrpBRfmIyagOTnhmR2TkppgWM"
const url = `https://api.unsplash.com/photos?client_id=${Key}`

function addImageToDom(image) {

}
function addImages(images) {

    images.forEach((image,index) => {
       
        var div = document.createElement('div');
        div.className = 'col-lg-8 px-2  mb-2';

        var elem = document.createElement("img");
        elem.setAttribute("src", image.urls.regular);
        elem.className = "img-fluid"
        div.appendChild(elem)
        

        // seperate adding images to the DOm by 1.5sec
        setTimeout((image) => {
           
            document.getElementById("images").appendChild(div)
            console.log("added")
        }, index*1500)

    })
}

async function getImages() {

    try {
        const response = await fetch(url);
        const images = await response.json();

        addImages(images)
        console.log("Images",images.length)


    } catch (error) {
        console.log(error)

    }
}
function checkScrollEnd(){
    if (window.scrollY + window.innerHeight >=
        0.7 * document.documentElement.scrollHeight) {

        // load new images
        getImages();

        //disable scroll event listener for 18sec(enough time to add images to DOM) to prevent triggering this event multiple times
        window.removeEventListener('scroll',checkScrollEnd)
        setTimeout(()=>{
            window.addEventListener('scroll', checkScrollEnd)
            console.log("relistening")
        },12*1500)
    }
}
window.addEventListener('scroll', checkScrollEnd)


getImages()
