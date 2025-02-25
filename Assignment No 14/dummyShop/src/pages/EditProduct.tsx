import { ChangeEvent, useEffect, useState } from "react"
import { Link,  useParams, useSearchParams } from "react-router-dom"
import { IProductType } from "../types/productTypes"
import { getProductById, updateProduct } from "../apis/productApi"

import { useProduct } from "../hooks/useProduct"
import toast, { Toaster } from "react-hot-toast"

const initialData = {
  id:0,
  title:'',
  price:0,
  description:'',
  image:'',
  category:'',
  rating:{rate:0,count:0},
  }
export const EditProduct = () => {
  const [searchParams] = useSearchParams()
  const {id} = useParams();
  const [prodData,setProdData] = useState<IProductType>(initialData);
  const {productDispatch} = useProduct();
  useEffect(()=>{
          const fetchProductData = async()=>{
            const prodId = Number(searchParams.get('productId'));
            const res = await getProductById({id:prodId});
            setProdData(res);
          }
          fetchProductData();
      },[])
    const handleChange = (e: ChangeEvent) => {
        const element = e.target as HTMLInputElement;
        setProdData({ ...prodData, [element.name]: element.value });
      };
      
       const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const updToast = toast.loading('Updating product...');
          const res = await updateProduct({data:prodData});
          productDispatch({type:'UPDATE_PRODUCT',data:res});
          toast.success('Product updated successfully',{id:updToast});
      
          setProdData(initialData);

        };
  return (
    <div className="w-svw h-svh flex flex-col gap-10 items-center p-10 mt-[-10px]">
      <Toaster/>
  <div className="w-full h-20 bg-purple-200 font-serif p-4">
    <Link className="border border-fuchsia-800 bg-fuchsia-500 rounded p-2 text-lg" to={`/home/${id}?role=admin`}>
      Home
    </Link>
  </div>
  {
    prodData.id!==0?<form onSubmit={handleSubmit} className="flex flex-col gap-8 p-10 border rounded-2xl w-1/2">
    <div className="flex gap-5 justify-between">
      <div className="w-1/2">
        <label className="block text-gray-600 font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={prodData.title}
          onChange={handleChange}
          placeholder="Enter product title"
          className="w-full border rounded-lg p-2 outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Price ($)</label>
        <input
          type="number"
          name="price"
          value={prodData.price}
          onChange={handleChange}
          placeholder="Enter price"
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>
    </div>

    <div>
      <label className="block text-gray-600 font-medium mb-1">Description</label>
      <textarea
        name="description"
        value={prodData.description}
        onChange={handleChange}
        placeholder="Enter product description"
        rows={3}
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
      />
    </div>

    <div className="flex gap-5 justify-between">
      <div className="w-1/2">
        <label className="block text-gray-600 font-medium mb-1">Image URL</label>
        <input
          type="text"
          name="image"
          value={prodData.image}
          onChange={handleChange}
          placeholder="Enter image URL"
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-600 font-medium mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={prodData.category}
          onChange={handleChange}
          placeholder="Enter category"
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>
    </div>

    <div className="flex justify-center">
      <button type="submit" className="w-24 text-lg bg-stone-900 border text-white p-2 rounded-lg">
        Submit
      </button>
    </div>
  </form>:''
  }
</div>

  )
}
