import axios  from 'axios'
const axiosInstance = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});


axiosInstance.get('/todos?_limit=5')
    .then((res)=>console.log(res.data))