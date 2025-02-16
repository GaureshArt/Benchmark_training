
export const productInstance = axios.create({
    baseURL:"https://fakestoreapi.com/products"
});

export const cartInstance = axios.create({
    baseURL:'https://fakestoreapi.com/carts'
});
export const userInstance = axios.create({
    baseURL:'https://fakestoreapi.com/users'
});


export const loginInstance = axios.create({
    baseURL:'https://fakestoreapi.com/auth'
})