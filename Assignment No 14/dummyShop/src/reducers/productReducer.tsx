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
            if(action.category==='All products')return {...state,filterData:state.originalData};
            const newData = state.originalData.filter((prod)=>prod.category===action.category);
            return {
                ...state,filterData:newData,
            }
        }
        case 'ADD_PRODUCT':{
            const isExits = state.originalData.find((prod)=>prod.title === action.data.title);
            console.log('lkhgkjer:',isExits)
            if(isExits)return state;
            state.originalData.push(action.data);
            return {
                ...state
            }
        }
        case 'UPDATE_PRODUCT':{
            const newData = state.originalData.map((prod)=>{
                if(prod.id===action.data.id){
                    return {...prod, ...action.data};
                }
                return prod;
            })
            return {
                originalData:newData,
                filterData:newData
            }
        }
    
    }
}