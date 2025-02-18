import { getUserApi } from "./apis/getApis.js";

import { authLogInApi } from "./apis/postApis.js";

const logInSection = document.querySelector(".login-section") as HTMLDivElement;

const getDummyLoginBtn = document.querySelector(
  ".get-dummy-login"
) as HTMLButtonElement;
const dummyLoginBtn = document.querySelector(
  ".dummy-login"
) as HTMLButtonElement;
const inputUsername = document.querySelector(".username") as HTMLInputElement;
const inputPassword = document.querySelector(".password") as HTMLInputElement;
const heroSection = document.querySelector(".hero-section") as HTMLDivElement;

type eventListener = {
  getDummyCredentials: () => void;
  getLogIn: () => void;
};

const getDummyCredentials: eventListener["getDummyCredentials"] = async () => {
  try {
    const user = await getUserApi();
    inputPassword.value = user.password;
    inputUsername.value = user.username;
  } catch (err) {
    throw err;
  }
};
getDummyLoginBtn.addEventListener("click", getDummyCredentials);

const getLogIn: eventListener["getLogIn"] = async (): Promise<void> => {
  const auth = await authLogInApi({
    username: inputUsername.value,
    password: inputPassword.value,
  });
  if (auth) {
    logInSection.remove();
    heroSection.classList.remove("hidden");
    sessionStorage.setItem("user-token", auth.token);
  }
};
dummyLoginBtn.addEventListener("click", getLogIn);
