import { getProdById } from '@/api/productsApi';
import { ProductCard } from '@/components/layouts/ProductCard';
import { ProductViewCard } from '@/components/layouts/ProductViewCard';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'

export const ProductView = () => {
    const {id} = useParams();
    const {data:prodData,isLoading,isError,error} = useQuery({
        queryKey:['product',id],
        queryFn:()=>getProdById({id:+id!}),
    })
    if(isLoading){
        return <h1 className='text-3xl text-center'>Loading...</h1>
    }
    if(isError){
        return <h1 className='text-3xl text-center'>Error: {error.message}</h1>
    }
  return (
    <>
        {
            prodData?
            <div className='w-full h-full flex justify-center'>
                <ProductViewCard prod={prodData}/>
            </div>
            :''

        }
    </>
  )
}
