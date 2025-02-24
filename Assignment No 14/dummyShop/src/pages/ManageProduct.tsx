import React, { ChangeEvent, useState } from "react";
import { IAddProductFormDataType } from "../types/manageProductType";
import { Link, useParams } from "react-router-dom";
import { addProduct } from "../apis/productApi";
import { useProduct } from "../hooks/useProduct";

export const ManageProduct = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const {id} = useParams();
  const {productDispatch} = useProduct()
  const [formData, setFormData] = useState<IAddProductFormDataType>({
    title: "",
    price: 0,
    description: "",
    image: "",
    category: "",
  });
  const handleChange = (e: ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setFormData({ ...formData, [element.name]: element.value });
  };
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await addProduct({prod:formData});
    console.log(res)
    productDispatch({type:'ADD_PRODUCT',data:res});
    
  };
  return (
    <>
      <div className="w-svw h-svh flex flex-col gap-10 items-center p-10 mt-[-10px]">
        <div className="w-full h-20 bg-purple-200 font-serif p-4">
          <Link className="border border-fuchsia-800 bg-fuchsia-500 rounded p-2 text-lg" to={`/home/${id}?role=admin`}> Home</Link>
        </div>
        <button
          className="w-24 h-10 border rounded-2xl bg-green-100 border-green-600 text-green-600"
          onClick={() => setIsAdding(true)}
        >
       
          Add Product
        </button>
        {isAdding ? (
          <>
            <div className="w-3/5 h-auto border rounded-3xl border-stone-800  font-serif ">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 p-10 "
              >
                <div className="flex gap-5 justify-between">
                  <div className="w-1/2">
                    <label className="block text-gray-600 font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter product title"
                      className="w-full border rounded-lg p-2 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows={3}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                  />
                </div>

                <div className="flex  gap-5 justify-between">
                  <div className="w-1/2">
                    <label className="block text-gray-600  font-medium mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="Enter image URL"
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Enter category"
                      className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-24 text-lg  bg-stone-900 border text-white p-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
