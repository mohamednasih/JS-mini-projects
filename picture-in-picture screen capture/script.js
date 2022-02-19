const start=document.getElementById("start")
const video=document.getElementById("video")

if ('pictureInPictureEnabled' in document) {
   
    start.hidden = false;
  
    start.addEventListener('click', () => {
      video.requestPictureInPicture();
    });
  }


