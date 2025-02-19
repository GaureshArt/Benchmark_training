import axios from "axios";
import { useEffect, useState } from "react";
import { IPostType } from "../types/apiTypes";
import { Form } from "./Form";
import { Toaster,toast } from "react-hot-toast";
import { HashLoader } from "react-spinners";

export const Posts = () => {
  const [posts, setPosts] = useState<IPostType[]>([]);
  const [postId, setPostId] = useState<number>(1);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isError, setError] = useState<string>("");
  const [showForm,setShowForm] = useState<boolean>(false);
  useEffect(() => {
    if(isLoading){
      toast.loading('Please Wait!')
      return;
    }
    setIsloading(true);
    axios
      .get<IPostType>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => {
          setPosts([...posts,res.data])       
      })
      .catch((err) => setError((err as Error).message))
      .finally(() => {
      setIsloading(false);
      toast.dismiss();
      });
  }, [postId]);
  const handleSetShowForm = ()=>{
    setShowForm(false);
  }

  return (
    <>
     <div><Toaster/></div>
      <div className="w-[100vw] h-auto bg-zinc-700 flex flex-col items-center ">
        <nav className="w-full flex justify-center h-20 bg-zinc-300 items-center gap-5">
          <button
            className="w-20 h-10 border border-orange-800 rounded bg-orange-400 cursor-pointer"
            onClick={() => {
              setPostId(postId + 1);
              setShowForm(false);
            }}
          >
            Get Post
          </button>
          <button className="w-20 h-10 border border-green-800 rounded bg-green-400 cursor-pointer" onClick={()=>setShowForm(true)}>
            Add Post
          </button>
        </nav>

            {
                showForm?<Form handleSetShowForm = {handleSetShowForm}/>:
        <div className="w-3/5  h-full border border-zinc-200 mt-2">

            
          <ul className="p-2 flex gap-4 justify-center items-center flex-col font-mono">
            {isError ? (
              <>
                <h1 className="text-violet-500 font-bold text-xl">{isError}</h1>
              </>
            ) : isLoading ? (
              <>
                <h1 className="text-violet-500 font-bold text-xl">
                <HashLoader
                  color="#3e33d7"
                  cssOverride={{}}
                  loading
                  size={30}
                  speedMultiplier={2}
                />
                </h1>
              </>
            ) : (
              posts
                ?.map((post) => {
                  return (
                    <li
                      key={post.id}
                      className="w-full h-auto bg-violet-400 border rounded-lg p-1 flex justify-center items-center gap-2"
                    >
                      <div className="w-full">
                        <h1 className="title font-black">
                          Title: {post.title}
                        </h1>
                        <span className="postBody font-light">{post.body}</span>
                      </div>
                      <hr className=" w-1 h-20 bg-gray-700 border-gray-700 border-t-2" />
                      <div className="flex flex-col gap-1 w-40  ">
                        <h1> Id: {post.id}</h1>
                        <h1>user Id: {post.userId}</h1>
                      </div>
                    </li>
                  );
                })
            )}
          </ul>
        </div>
            }
      </div>
    </>
  );
};
