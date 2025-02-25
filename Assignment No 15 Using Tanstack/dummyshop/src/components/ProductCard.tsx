import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { IProductCardProps, IProductType } from "../types/productTypes";
import { IoStar } from "react-icons/io5";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../apis/productApi";

export const ProductCard = ({ prod }: IProductCardProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParam] = useSearchParams();
  const queryClient = useQueryClient();
  const handleProductView = (e: React.MouseEvent<HTMLDivElement>) => {
    const productId = (e.currentTarget as HTMLDivElement).id;
    navigate(`/productView/${id}?productId=${productId}`);
  };
  const handleProdRemove = ({ data }: { data: IProductType }) => {
    queryClient.setQueryData(["products"], (prev: IProductType[]) => {
      return prev.filter((prod) => prod.id !== data.id);
    });
    queryClient.setQueryData(
      ["filterProducts", "All products"],
      (prev: IProductType[]) => {
        return prev.filter((prod) => prod.id !== data.id);
      }
    );
  };

  const removeProd = useMutation({
    mutationKey: ["RemoveProd"],
    mutationFn: deleteProduct,
    onSuccess: handleProdRemove,
  });
  const handleRemove = () => {
    if (!confirm("Are you sure?")) return;
    removeProd.mutate({ id: prod.id });
  };
  return (
    <>
      <div className="w-96 h-[26rem] border rounded-md border-gray-700 p-1 font-serif ">
        <div
          className="w-full h-2/3 p-1"
          id={`${prod.id}`}
          onClick={handleProductView}
        >
          <img
            className="w-full h-[95%] object-contain"
            src={prod.image}
            alt="productImage"
          />
        </div>
        <div className="w-full text-justify">
          <span className=" line-clamp-2 text-lg ">{prod.title}</span>
        </div>
        <div className="w-full  h-20 ">
          <span className="mt-14 p-2 text-2xl">${prod.price}</span>
          <div className="flex gap-5">
            <span className="text-xl flex items-center gap-1">
              <IoStar />
              {prod.rating?.rate ?? 0}
            </span>
            {searchParam.get("role") === "admin" ? (
              <>
                <div className=" h-full gap-2 mb-5 flex items-center justify-center">
                  <Link
                    className="w-20 flex justify-center items-center p-2 border rounded-lg h-10 bg-stone-900 text-stone-50 cursor-pointer"
                    to={`/editProduct/${id}?role=admin&productId=${prod.id}`}
                  >
                    {" "}
                    Edit
                  </Link>
                  <button
                    className="w-auto h-auto p-2 border rounded-xl cursor-pointer "
                    onClick={handleRemove}
                  >
                    Remove
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
