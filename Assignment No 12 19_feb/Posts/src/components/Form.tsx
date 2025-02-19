import { ChangeEvent, useState } from "react"
import { IFormData } from "../types/apiTypes"
import axios from "axios"
import toast from "react-hot-toast"
import { IFormProps } from "../types/propsTypes"

export const Form = ({handleSetShowForm}:IFormProps)=>{

    const [formData,setFormData] = useState<IFormData>({
        userId:0,
        title:'',
        body:''
    })
    

    const handleFormData = (e:ChangeEvent<HTMLInputElement>)=>{
        setFormData({
            ...formData,
            [e.target.id]:(e.target.id==='userId'? +e.target.value:e.target.value)
        })

    }
    const formValidation = ()=>{
        if(!formData.title){
            toast.error('Please add Title to post');
            return false;
        }
        if(!formData.body){
            toast.error('Please add body to post');
            return false;
        }
        if(formData.userId<=0){
            toast.error('userId can not be lesser than 1.');
            return false;
        }
        return true;
    }
    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement> )=>{
        e.preventDefault();
        if(!formValidation())return;       
        const toastId = toast.loading('Form submitting!')
        axios.post('https://jsonplaceholder.typicode.com/posts',{
            ...formData
        })
        .then((res)=>{
            toast.success(`Successfully posted! Status code: ${res.status}`,{id:toastId})
            setFormData({
               userId:0,
               title:'',
               body:''
           });
            handleSetShowForm();
        })
        .catch((err)=>{
            toast.error(`Failed : ${err.message}`,{id:toastId})
        })
        .finally(()=>{
           
        })
    }
    
    return (
        <>  
           
            <form className="w-2/5 h-75 gap-5 mt-10 p-5 border border-gray-300 rounded-lg grid grid-cols-4 grid-rows-3 font-mono text-zinc-00" onSubmit={handleFormSubmit}>
                <div >
                    <label htmlFor="userId" className="text-zinc-100">
                        User Id
                    </label>
                    <input type="number"  id="userId" className="w-full h-10 border border-gray-400 bg-gray-600 rounded p-2" value={formData.userId} onChange={handleFormData}/>
                </div>
                <div className="col-span-3 w-auto">
                <label htmlFor="title" className="text-zinc-100">
                        Title
                    </label>
                    <input type="text"  id="title" className="w-full h-10 border border-gray-400 bg-gray-600 rounded p-2" value={formData.title} onChange={handleFormData}/>
                </div>
                <div className="col-span-full">
                <label htmlFor="body" className="text-zinc-100">
                        Body
                    </label>
                    <input type="text"  id="body" className="w-full h-14 border border-gray-400 bg-gray-600 rounded p-2" value={formData.body}  onChange={handleFormData}/>
                </div>
                <button className="col-span-full border border-red-100 bg-red-400 mt-5 rounded-lg text-zinc-100 cursor-pointer"  type="submit"> Submit</button>
            </form>
        </>
    )
}