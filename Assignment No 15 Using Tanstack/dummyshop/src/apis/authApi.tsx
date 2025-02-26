import axios from "axios";
import {  IUserTypeApi } from "../types/userTypes";

export const fakeStoreApi = axios.create({
    baseURL:'https://fakestoreapi.com'
})

export const getUser = async ():Promise<IUserTypeApi>=>{
    const randomId = Math.floor(Math.random()*10)+1;
    
    try{
        const res = fakeStoreApi.get<IUserTypeApi>(`/users/${randomId}`);
        const userData = (await res).data;
        return userData;
    }
    catch(err){
        throw new Error(`This is getuser Error: ${err}`);
    }
    
}


