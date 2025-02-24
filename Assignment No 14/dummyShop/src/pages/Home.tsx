import { ChangeEvent,  useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct"
import { getAllCategories, getProductsApi } from "../apis/productApi";
import { ProductCard } from "../components/ProductCard";
import { Category } from "../types/productTypes";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";



export const Home = () => {
    const {productState,productDispatch} = useProduct();
    const [categories,setCategories] = useState<Category[]>([]);
    const [selectedCategory,setSelectedCategory] = useState<Category>('All products');
    const navigate = useNavigate();
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    useEffect(()=>{
        const fetchCategories = async()=>{
            const res = await getAllCategories();
            setCategories(res);
        }
        fetchCategories();
        if(productState.originalData.length)return;
        const fetchProducts = async ()=>{
            const res = (await getProductsApi())
            productDispatch({type:'SET_PRODUCTS',data:res});
        }
        fetchProducts();
    },[])
    
    
    const handleCategoryChange = (e:ChangeEvent<HTMLSelectElement>)=>{
        setSelectedCategory(e.target.value);
        productDispatch({type:'FILTER_PRODUCTS',category:e.target.value})
    }
    const handleCartButton = ()=>{
        navigate(`/cartView/${id}`)
    }
    return (
        <>
            <div className="w-svw h-auto border rounded p-2">
                <div className="w-full h-20 bg-sky-100 font-serif p-4  flex gap-5 items-center">
                    <span className="font-2xl pr-5">Filter</span>
                <select defaultValue={selectedCategory} onChange={handleCategoryChange} className="w-40 h-10 border border-violet-800 rounded-lg font-serif outlime-none bg-violet-200">
                    <option value="All products" >All Products</option>
                    {
                        categories.map((cat,ind)=>{
                            return (
                               <option key={ind} >
                                    {cat}
                               </option>
                            )
                        })
                    }
                </select>
                
                    <button className="w-22 border rounded-lg h-10 bg-stone-900 text-stone-50 cursor-pointer" onClick={handleCartButton}>My Cart</button>
                    {
                        searchParams.get('role')==='admin'?<>
                        <Link className="w-auto flex justify-center items-center p-2 border rounded-lg h-10 bg-stone-900 text-stone-50 cursor-pointer" to={`/manageProduct/${id}?role=admin`}>Manage Product </Link>
                        </>:''
                    }
                </div>
                <div className="flex gap-5 flex-wrap p-2 justify-evenly">
                    {
                        productState.filterData.length?
                        productState.filterData.map((prod)=>{
                            return <ProductCard key={prod.id} prod={prod} />
                        }):<><h1 className="w-auto p-5 rounded-2xl h-auto border border-blue-600 text-2xl font-bold font-serif">Loading</h1></>
                    }
                </div>

            </div>
        </>
    )
}
