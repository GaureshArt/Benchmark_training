import axios from "axios";
import {  IUserTypeApi } from "../types/userTypes";

export const fakeStoreApi = axios.create({
    baseURL:'https://fakestoreapi.com'
})

export const getUser = async ():Promise<IUserTypeApi>=>{
    try{
        const res = fakeStoreApi.get<IUserTypeApi>('/users/1');
        const userData = (await res).data;
        return userData;
    }
    catch(err){
        throw new Error(`This is getuser Error: ${err}`);
    }
    
}


