import { getProdById, updateProdById } from "@/api/productsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IProductType } from "@/types/productsType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";

export const ProductEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<IProductType>({
    id: Number(id!),
    title: "",
    category: "",
    price: 0,
    description: "",
    image: "",
  });
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProdById({ id: +id! }),
  });

  const updateProd = useMutation({
    mutationKey: ["productUpdate", id],
    mutationFn: updateProdById,
    onSuccess: (data) => {
      queryClient.setQueryData(["products"], (prev: IProductType[]) => {
        const newData = prev.map((prod) => {
          return prod.id === data.id ? data : prod;
        });
        return newData;
      });
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mergedData: IProductType = {
      id: formData.id,
      title: formData.title || data!.title,
      category: formData.category || data!.category,
      price: formData.price || data!.price,
      description: formData.description || data!.description,
      image: formData.image || data!.image,
    };
    updateProd.mutate({ prod: mergedData });
  };
  const handleFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  if (isLoading) {
    return (
      <>
        <h1 className="text-3xl ">Loading...</h1>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <h1> Error in products: {error.message}</h1>
      </>
    );
  }
  return (
    <>
      {" "}
      {data && (
        <div className="w-full h-auto flex justify-center items-center">
          <form
            className="w-1/3 h-1/2 border p-5 flex flex-col gap-3 rounded border-zinc-400"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="title"
                  defaultValue={data!.title}
                  onChange={handleFormData}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  placeholder="price"
                  defaultValue={data!.price}
                  onChange={handleFormData}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Write Description about product"
                id="description"
                defaultValue={data!.description}
                onChange={handleFormData}
              />
            </div>
            <div className="flex justify-center gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="category">Category</Label>
                <Input
                  type="text"
                  id="category"
                  placeholder="category"
                  defaultValue={data!.category}
                  onChange={handleFormData}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="image">ImageUrl</Label>
                <Input
                  type="text"
                  id="image"
                  placeholder="image"
                  defaultValue={data!.image}
                  onChange={handleFormData}
                />
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button type="submit">Update</Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
