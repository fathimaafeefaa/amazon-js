document.getElementById("fetchBtn").addEventListener("click",async()=>{
    const result =document.getElementById("apiResult")
    result.textContent="Loading";
    try{
        const response=await fetch("https://jsonplaceholder.typicode.com/posts/1")
        const data=await response.json();
        result.textContent=JSON.stringify(data,null,2)
    }
    catch(error){
        result.textContent="error fetching"
    }

})

const worker = new Worker("worker.js");

document.getElementById("computeBtn").addEventListener("click", () => {
    document.getElementById("computeResult").textContent = "Calculating...";

    worker.postMessage(1000000000);
});

worker.onmessage = function(event) {
    document.getElementById("computeResult").textContent =
        "Calculation Complete! Result: " + event.data;
}