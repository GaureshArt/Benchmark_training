// Task: Write a function fetchData that simulates fetching data from a server using a callback function.
// The function should take a callback that processes the data after a delay of 2 seconds.
// Use setTimeout to simulate the server delay.
// The data should be an array of user names.
// Implement error handling in the callback function to simulate a case where the server might fail.

//using callback
const onDataFetched = (isSuccessful,data)=>{
    if(isSuccessful){
        console.log(`Data fetched successfully.`,data);
    }else{
        console.error(`Error while fetching data`);
    }
}

const fetchData = (callback)=>{
    setTimeout(()=>{
        const isSuccessful = Math.random() > .5;
        const userNames = ['Ajay','Raj','Amey','Rahul','Tejas'];
        callback(isSuccessful,userNames);
    },2000)
}
fetchData(onDataFetched);



//uisng Promise
const fetchData1 = new Promise((res,rej)=>{
    setTimeout(()=>{
        const isSuccessful = Math.random() > .5;
        const userNames = ['Ajay','Raj','Amey','Rahul','Tejas'];
        if(isSuccessful)
            res(userNames);
        else 
            rej("Went somethign wrong");
    },2000)
})

fetchData1.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
})


//using async await
const asyncWay = async ()=>{
    try{
        const res = await fetchData1;
        console.log(res);
    }
    catch(err){
        console.log("This is error:",err);
    }
}
asyncWay();


