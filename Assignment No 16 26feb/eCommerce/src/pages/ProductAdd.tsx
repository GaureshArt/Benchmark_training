import { addProduct, updateProdById } from '@/api/productsApi';
import toast, {Toaster} from 'react-hot-toast'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useProductStore } from '@/store/useProductStore';
import { IProductType } from '@/types/productsType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { ChangeEvent, useState } from 'react'

export const ProductAdd = () => {
    const [formData,setFormData] = useState<Partial<IProductType>>({title:'',category:'',price:0,description:'',image:''});
    const queryClient = useQueryClient();


    const addProd = useMutation({
        mutationKey:['productAdd'],
        mutationFn:addProduct,
        onSuccess:(data)=>{
            queryClient.setQueryData(['products'],(prev:IProductType[])=>[...prev,data]);
            useProductStore.setState({filterData:queryClient.getQueryData(['products'])});
        },
        onError:(error)=>{
            console.log("Error",error.message)
        }
    })

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(formData.title==='' || formData.category ==='' || formData.price===0 || formData.description==='' || formData.image===''){
            toast.error('Please fill form Completely')
            return;
        }
        addProd.mutate({data:formData})
        
        
    }
    const handleFormData = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setFormData({
            ...formData,
            [e.target.id]:e.target.value,
        })
    }
    
    if(addProd.isPending){
       return <h1 className='text-center '> Product getting added</h1>
    }

  return (
    <>  
        
        <Toaster />
    {
        <div className="w-full h-auto flex justify-center items-center">
            <form className="w-1/3 h-1/2 border p-5 flex flex-col gap-3 rounded border-zinc-400" onSubmit={handleSubmit}>
                <div className="flex justify-center gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" placeholder="title" defaultValue={formData.title}  onChange={handleFormData}/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="price">Price</Label>
                        <Input type="number" id="price" placeholder="price" defaultValue={formData!.price} onChange={handleFormData}/>
                    </div>
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea placeholder="Write Description about product" id="description" defaultValue={formData!.description} onChange={handleFormData}/>
                </div>
                <div className="flex justify-center gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="category">Category</Label>
                        <Input type="text" id="category" placeholder="category" defaultValue={formData!.category} onChange={handleFormData}/>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="image">ImageUrl</Label>
                        <Input type="text" id="image" placeholder="image" defaultValue={formData!.image} onChange={handleFormData} />
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <Button type="submit">
                        Add
                    </Button>
                </div>

            </form>
         </div>
        }
    </>
  )
}
