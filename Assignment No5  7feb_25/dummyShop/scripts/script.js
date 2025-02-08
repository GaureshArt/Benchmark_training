import {getProductsByCategoryApi} from './apis/getApis.mjs';


const imageSlider = document.querySelector('.imageSlider');
const showHeroSectionImgs = (imageURL)=>{
    setInterval(()=>{
        const ind = Math.floor(Math.random()*4);
        imageSlider.classList.remove('hidden')
        imageSlider.src = imageURL[ind];
    },2000);
}
const getHeroSectionImgs = async ()=>{
    const data = await getProductsByCategoryApi(`men's clothing`)
    const imageURL = data.data.map((prod)=>prod.image)
    showHeroSectionImgs(imageURL);
}
getHeroSectionImgs();