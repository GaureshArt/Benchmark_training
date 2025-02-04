
const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');


let imageSrcArray = [];
let imageIndex = 0;
let totalImages = 4;


const getRandomId = ()=>{
    return Math.floor(Math.random()*(120-15+1)+15);
}


const getImages = ()=>{
    let imageURl = `https://picsum.photos/id/`    
    for(let i=0;i<totalImages;i++){
        imageSrcArray.push( `${imageURl}${getRandomId()}/350/200`);
    }
    const imgTag = document.createElement('img');
    imgTag.src = imageSrcArray[imageIndex];
    imgTag.alt = 'image';
    const slider = document.querySelector('.slider');
    slider.appendChild(imgTag);
}
getImages()

previousBtn.addEventListener('click',()=>{
    const imgTag = document.querySelector('img');
    imageIndex = (imageIndex-1+totalImages)%totalImages;
    imgTag.src = imageSrcArray[imageIndex]; 
})

nextBtn.addEventListener('click',()=>{
    const imgTag = document.querySelector('img');
    imageIndex = (imageIndex+1)%totalImages;
    imgTag.src = imageSrcArray[imageIndex];
})
