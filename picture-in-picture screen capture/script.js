const start=document.getElementById("start")
const video=document.getElementById("video")
var captureStream =null;

const captureContraint= {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 720, ideal: 720, max: 1080 }
}
if ('pictureInPictureEnabled' in document) {
   
    start.hidden = false;
  
    start.addEventListener('click', () => {
        captureStream=navigator.mediaDevices.getDisplayMedia();
        captureStream.then((mediaStream)=>{
            console.log(mediaStream)
            video.srcObject=mediaStream;
            console.log(video.srcObject)
            video.addEventListener("loadedmetadata",()=>{
                console.log("metadata loaded")
                video.requestPictureInPicture();
            })
            
        })
      
    });
  }



