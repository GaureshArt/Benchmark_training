import React, {  useEffect, useReducer, useState } from 'react'
import {  ICartCardPropType, ProdReducerActionTypes } from '../types/cartTypes'
import { IProductType } from '../types/productTypes'
import { getProductById } from '../apis/productApi';
import { useCart } from '../hooks/useCart';


export const reducer = (state:IProductType,action:ProdReducerActionTypes):IProductType=>{
    switch (action.type) {
        case 'SET_DATA':{
            return action.data;
        }
    
        default:{
            return state;
        }
    }
}
export const CartCard = ({cart}:ICartCardPropType) => {
    const [prodState,prodDispatch] = useReducer(reducer,{
    id:-1,
    title:'',
    price:0,
    description:'',
    image:'',
    category:'',
    rating:{
        rate:0,
        count:0
    }
    })
    const {cartDispatch} = useCart();
    const [quantity,setQuantity] = useState<number>(cart.quantity)
    const [initialQuantity,setInitialQuantity] = useState(cart.quantity);
    useEffect(()=>{
        const fetchProdData = async()=>{
            const res = await getProductById({id:cart.productId});
            prodDispatch({type:'SET_DATA',data:res})
        }
        fetchProdData();
    },[])

    const handleQuantiy = (e:React.MouseEvent<HTMLDivElement>)=>{
        const operator = (e.target as HTMLDivElement).innerHTML
        if(operator==='+'){
            setQuantity(quantity+1);
        }else{
            if(quantity===1){
                return;
            }
            setQuantity(quantity-1);
        }

    }
    const handleQuantityUpdate = ()=>{
        cartDispatch({type:'UPDATE_CART_PRODUCT',data:{productId:cart.productId,quantity:quantity}})
        setInitialQuantity(quantity);
    }
    const handleRemoveCart = ()=>{
        if(!confirm('Are you sure'))return;
        cartDispatch({type:'REMOVE_CART_PRODUCT',data:cart.productId});
    }
  return (
    <>
        <div className='w-1/4 h-[30rem]  border rounded-2xl font-serif'>
           {
            prodState.id!==-1?<>
                 <div className='w-full h-1/2'>
                    <img className=' w-full h-full object-contain' src={prodState.image} alt="prodImage" />
                 </div>
                 <div className='p-3 flex flex-col gap-2'>
                 <span className=" line-clamp-1 text-lg ">{prodState.title}</span>
                 <div> Base Price:{prodState.price}</div>
                 <div className="flex gap-8 items-center ">
                        <div className="text-1xl border w-9 rounded-lg text-center font-bold text-stone-50 bg-stone-800  cursor-pointer select-none" onClick={handleQuantiy}>-</div>
                        <span className="text-xl">Quantity: {quantity}</span>
                        <div className="text-1xl border w-9 rounded-md text-center font-bold text-stone-50 bg-stone-800 cursor-pointer select-none" onClick={handleQuantiy}>+</div>
                        {
                            initialQuantity!==quantity?<button className='w-auto h-auto p-2 rounded border cursor-pointer font-bold bg-stone-800 text-stone-50' onClick={handleQuantityUpdate}>Update</button>:''
                        }
                    </div>
                 <div>Total Price {(quantity * prodState.price).toPrecision(6)}</div>
                    <div className='flex justify-center'><button className='w-auto h-auto p-1 rounded border cursor-pointer font-bold bg-stone-800 text-stone-50' onClick={handleRemoveCart}>Remove</button></div>
                 </div>
            </>:<>
            <div className=' grid place-items-center w-full h-full text-2xl font-bold '><h1>Loading..</h1></div>
            </>
           }

        </div>
    </>
  )
}
