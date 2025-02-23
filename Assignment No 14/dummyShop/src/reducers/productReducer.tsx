import { IProductReducerState,  productAction } from "../types/productTypes";





export const productReducer = (state:IProductReducerState,action:productAction):IProductReducerState=>{
    switch(action.type){
        case 'SET_PRODUCTS':{
            return {
                originalData:action.data,
                filterData:action.data,
            }
        }
        case 'FILTER_PRODUCTS':{
            const newData = state.originalData.filter((prod)=>prod.category===action.category);
            return {
                ...state,filterData:newData,
            }
        }
    }
}