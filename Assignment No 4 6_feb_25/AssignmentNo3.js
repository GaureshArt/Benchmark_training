
const startLeak = document.querySelector('.start')
const stopLeak = document.querySelector('.stop')

let leakArray = [];
let leakInterval;

function memoryLeakStart() {
    leakInterval = setInterval(() => {
        const largeObject = new Array(1000000).fill("1234567890"); 
        leakArray.push(largeObject);
        
        if (performance.memory) {
            console.log(`Heap Used: ${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
        }
    }, 1000);
}

function cleanup() {
    
    console.log("Stopping memory leak simulation...");
    clearInterval(leakInterval); 
    leakArray = []; 
    console.log("Memory cleaned up!");

}

startLeak.addEventListener('click',memoryLeakStart)
stopLeak.addEventListener('click',cleanup);