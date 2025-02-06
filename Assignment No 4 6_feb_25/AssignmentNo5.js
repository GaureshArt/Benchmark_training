// Task: Create a processData function that accepts an array of numbers and a callback.
// If the callback is filterOdd, filter out even numbers.
// If the callback is doubleNumbers, double each number.
// If the callback is calculateSum, return the sum of all numbers. Bonus Task: Implement a callback to find the maximum number in the array.


const processData  = (numData,callback)=>{
    const result = callback(numData);
    console.log(result);
}

const filterOdd = (numData) =>{
    return numData.filter((num)=>num&1);
}

const doubleNumbers = (numData)=>{
    return numData.map((num)=>num*2);
}

const calculateSum = (numData)=>{
    return numData.reduce((totalSum,num)=>num+totalSum,0);
}

const maximumNum = (numData)=>{
    return numData.reduce((maxNum,currNum)=> maxNum > currNum ? maxNum:currNum,numData[0]);
}

const data = [1,2,3,4,5];
processData(data,filterOdd);
processData(data,doubleNumbers);
processData(data,calculateSum);
processData(data,maximumNum);

