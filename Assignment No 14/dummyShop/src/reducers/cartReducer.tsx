
import { CartReducerActionType,  ICartProductsType, ICartReducerStateType, } from "../types/cartTypes";

export const cartReducer = (state:ICartReducerStateType,action:CartReducerActionType)=>{
    switch(action.type){
        case 'SET_CART_PRODUCTS':{
            const existingProductId =new  Set<number>();
            const newState:ICartProductsType[] = []
            action.data.map((cart)=>{
                cart.products.map((prod)=>{
                    if(!existingProductId.has(prod.productId)){
                        newState.push(prod);
                        existingProductId.add(prod.productId);
                    }
                })
            })
            return {cartData:newState,existingProducts:existingProductId};
        }
        case 'ADD_CART_PRODUCT':{
            if(state.existingProducts.has(action.productId))return state;
            const newCartData = state.cartData;
            newCartData.push({
                productId:action.productId,
                quantity:action.quantity
            });
            const newExistingProductsId = state.existingProducts;
            newExistingProductsId.add(action.productId);
            
            return {
                cartData:newCartData,
                existingProducts:newExistingProductsId,
            }
        }
        case 'REMOVE_CART_PRODUCT':{
            const newStateCartData = state.cartData.filter((prod)=>prod.productId !==action.data);
            const newExistingProductsId = state.existingProducts;
            newExistingProductsId.delete(action.data);
            return {
                cartData:newStateCartData,
                existingProducts:newExistingProductsId,
            }
        }
        case 'UPDATE_CART_PRODUCT':{
            const newStateCartData = state.cartData.map((prod)=>{
                return action.data.productId===prod.productId?action.data:prod;
            })
            return {...state,cartData:newStateCartData}
        }
        default:{
            return state;
        }
    }
}