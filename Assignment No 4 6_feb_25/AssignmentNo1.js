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