import { useState } from "react";
import { getUser } from "../apis/authApi";
import { IUserDataType } from "../types/userTypes";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Login = () => {
  const [userData, setUserData] = useState<IUserDataType>({
    username: "",
    password: "",
    id: 0,
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const handleGetCredentials = async (): Promise<void> => {
    const loader = toast.loading("please Wait");
    const data = await getUser();

    setUserData({
      username: data.username,
      password: data.password,
      id: data.id,
    });
    toast.success("Successfully retrive credentials", { id: loader });
  };

  const handleUserLogin = () => {
    if (!(userData.username && userData.password)) {
      toast.error("Please get credentials");
      return;
    }
    navigate(`/manageProduct/${userData.id}?role=user`);
  };
  const handleAdminLogin = () => {
    if (!(userData.username && userData.password)) {
      toast.error("Please get credentials");
      return;
    }
    navigate(`/manageProduct/${userData.id}?role=admin`);
  };
  return (
    <>
      <Toaster />
      <div className="w-svw h-svh border bg-slate-200 grid place-items-center  font-mono tracking-wide ">
        <div className="w-1/2 h-1/2 border border-sky-800 rounded-lg flex flex-col items-center pt-2">
          <div className="w-1/3 h-auto flex gap-6 flex-col">
            <div>
              <label htmlFor="username">Username</label>
              <input
                className="w-full h-12 border border-blue-600 bg-blue-100 outline-0 rounded-lg p-2"
                type="text"
                id="username"
                value={userData.username}
                autoComplete="username"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="password">password</label>
              <input
                className="w-full h-12 border border-blue-600 bg-blue-100 outline-0 rounded-lg p-2"
                type="password"
                id="password"
                value={userData.password}
                autoComplete="off"
                readOnly
              />
            </div>
          </div>
          <div className="w-full flex justify-center pt-6">
            <button
              className="h-10 border p-2 rounded-xl border-blue-700 bg-blue-100 cursor-pointer  text-blue-800"
              onClick={handleGetCredentials}
            >
              Get Credentials
            </button>
          </div>
          <div className="flex w-full justify-around pt-8">
            {role === "admin" ? (
              <button
                className="h-10 border p-2 rounded-xl border-yellow-700 bg-yellow-100 cursor-pointer  text-yellow-700"
                onClick={handleAdminLogin}
              >
                Log in as Admin
              </button>
            ) : (
              <button
                className="h-10 border p-2 rounded-xl border-fuchsia-700 bg-fuchsia-100 cursor-pointer text-fuchsia-700"
                onClick={handleUserLogin}
              >
                Log in as User
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
