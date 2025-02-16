var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getUserApi } from "./apis/getApis.js";
import { authLogInApi } from "./apis/postApis.js";
const logInSection = document.querySelector('.login-section');
const imageSlider = document.querySelector('.imageSlider');
const getDummyLoginBtn = document.querySelector('.get-dummy-login');
const dummyLoginBtn = document.querySelector('.dummy-login');
const inputUsername = document.querySelector('.username');
const inputPassword = document.querySelector('.password');
const heroSection = document.querySelector('.hero-section');
const getDummyCredentials = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield getUserApi();
        inputPassword.value = user.password;
        inputUsername.value = user.username;
    }
    catch (err) {
        throw err;
    }
});
getDummyLoginBtn.addEventListener('click', getDummyCredentials);
const getLogIn = () => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield authLogInApi({ username: inputUsername.value, password: inputPassword.value });
    if (auth) {
        logInSection.remove();
        heroSection.classList.remove('hidden');
        sessionStorage.setItem('user-token', auth.token);
    }
});
dummyLoginBtn.addEventListener('click', getLogIn);
