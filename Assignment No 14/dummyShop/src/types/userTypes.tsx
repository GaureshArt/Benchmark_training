interface IUsernameTypeApi {
    firstname:string;
    lastname:string;
}

export interface IUserTypeApi {
    address:object;
    email:string;
    id:number;
    name:IUsernameTypeApi;
    password:string;
    phone:string;
    username:string;
}
export interface IUserDataType{
    username:string;
    password:string;
    id:number;
}