import {getProductsByCategoryApi,getUserApi} from './apis/getApis.mjs';


const getUser = async()=>{
    const user = await getUserApi();
    return user;
}
// fetch('https://fakestoreapi.com/carts/user/1')
//             .then(res=>res.json())
//             .then(json=>console.log(json))


const imageSlider = document.querySelector('.imageSlider');
const dummyLoginBtn = document.querySelector('.dummy-login');
const inputUsername = document.querySelector('.username')
const inputPassword = document.querySelector('.password')

dummyLoginBtn.addEventListener('click',async (e)=>{
    const user = await getUser();
    console.log(user.data,user.data.username)
    inputPassword.value = user.data.password;
    inputUsername.value = user.data.username;
})

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