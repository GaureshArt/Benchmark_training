// Task 1: Use map() to transform data
// Create an array of product objects with properties name, price, and category.
// Use map() to create a new array with product names in uppercase.
// Task 2: Use filter() to extract specific data
// Use filter() to create an array of products that belong to the 'Electronics' category.
// Task 3: Use reduce() to calculate a total
// Use reduce() to calculate the total price of all products in the array.
// Task 4: Combine map(), filter(), and reduce()
// Create a function that calculates the total price of products from a specific category using map(), filter(), and reduce().


//task 1
const products = [
    { name: "Laptop", price: 1200, category: "Electronics" },
    { name: "Smartphone", price: 800, category: "Electronics" },
    { name: "Headphones", price: 150, category: "Accessories" },
    { name: "Coffee Maker", price: 100, category: "Home Appliances" },
    { name: "Desk Chair", price: 250, category: "Furniture" },
    { name: "Running Shoes", price: 120, category: "Footwear" },
    { name: "Backpack", price: 60, category: "Bags" },
    { name: "Wristwatch", price: 200, category: "Accessories" },
    { name: "Gaming Console", price: 500, category: "Electronics" },
    { name: "Electric Kettle", price: 80, category: "Home Appliances" }
];

const productNameUppercase = products.map((product)=>{
    return product.name.toUpperCase();
})
console.log(productNameUppercase);


//task 2

const electronicsProducts = products.filter((product)=>product.category==='Electronics');
console.log(` Electronics products are :`, electronicsProducts);

//task 3
const totalPrice = products.reduce((totalPrice,product)=>totalPrice+product.price,0);
console.log(` Total price of products is ${totalPrice}`);

//task 4

const getTotalPriceOf = (category)=>{
    const totalPrice = products.filter((product)=>product.category === category)
        .map((product)=>product.price)
        .reduce((totalPrice,price)=>price+totalPrice,0);
    return totalPrice;
}

console.log(` Total price of Electronics products is: ${ getTotalPriceOf('Electronics')}`)