import { getProdById } from '@/api/productsApi';
import { ProductCard } from '@/components/layouts/ProductCard';
import { ProductViewCard } from '@/components/layouts/ProductViewCard';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'

export const ProductView = () => {
    const {id} = useParams();
    const {data:prodData,isLoading,isError,error} = useQuery({
        queryKey:['product',id],
        queryFn:()=>getProdById({id:+id!}),
    })
    if(isLoading){
        return <>
             <Card className="w-full max-w-2xl mx-auto p-4">
      <CardContent className="flex flex-col md:flex-row gap-4">
        <Skeleton className="w-40 h-40 rounded-lg" />
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-5 w-1/4" />
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
        </>
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
