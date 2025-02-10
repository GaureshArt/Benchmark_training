import {getProductsByCategoryApi,getUserApi} from './apis/getApis.mjs';
import { authLogInApi } from './apis/postApis.mjs';




const logInSection = document.querySelector('.login-section');
const imageSlider = document.querySelector('.imageSlider');
const getDummyLoginBtn = document.querySelector('.get-dummy-login');
const dummyLoginBtn = document.querySelector('.dummy-login');
const inputUsername = document.querySelector('.username');
const inputPassword = document.querySelector('.password');
const heroSection = document.querySelector('.hero-section');




const getUser = async()=>{
    const user = await getUserApi();
    return user;
}

const checkUserToken = ()=>{
    const token = sessionStorage.getItem('user-token');
    if(token){
        logInSection.remove();
        heroSection.classList.remove('hidden')
    }
}

checkUserToken();
getDummyLoginBtn.addEventListener('click',async (e)=>{
    const user = await getUser();
    
    inputPassword.value = user.data.password;
    inputUsername.value = user.data.username;

})
dummyLoginBtn.addEventListener('click',async ()=>{
    const auth =await authLogInApi({username:inputUsername.value,password:inputPassword.value});
    if(auth.data){
        logInSection.remove();
        heroSection.classList.remove('hidden');
        sessionStorage.setItem('user-token',auth.data.token);   
    }
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