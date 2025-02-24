import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IProductCardProps } from "../types/productTypes"
import { IoStar } from "react-icons/io5";

export const ProductCard = ({prod}:IProductCardProps) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [searchParam] = useSearchParams();
  const handleProductView = (e:React.MouseEvent<HTMLDivElement> )=>{
    const productId = (e.currentTarget as HTMLDivElement).id;
    navigate(`/productView/${id}?productId=${productId}`)
  }
  return (
    <>
        <div className="w-96 h-96 border rounded-md border-gray-700 p-1 font-serif " >
                <div className="w-full h-2/3 p-1"  id={`${prod.id}`} onClick={handleProductView}><img className="w-full h-[95%] object-contain" src={prod.image} alt="productImage" /></div>
                <div className="w-full text-justify">
                    <span className=" line-clamp-2 text-lg ">{prod.title}</span>
                </div>
                <div className="w-full  h-20 ">
                <span className="mt-14 p-2 text-2xl">${prod.price}</span>
               <div className="flex gap-5">
               <span className="text-xl flex items-center gap-1"><IoStar/>{(prod.rating?.rate)??0}</span>
               { searchParam.get('role')?<Link className="w-20 flex justify-center items-center p-2 border rounded-lg h-10 bg-stone-900 text-stone-50 cursor-pointer"  to={`/editProduct/${id}?role=admin`}> Edit</Link>:''}
               </div>
                </div>

        </div>    
    </>
  )
}
