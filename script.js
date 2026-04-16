const start=document.querySelector(".submit")
const reset=document.querySelector(".reset")

reset.addEventListener("click",()=>{
    console.log("restarting the game ......")
    const squares=document.querySelectorAll(".board");
    squares.forEach(square => {

    square.textContent="";  
    });
})

start.addEventListener("click",()=>{
    console.log("hello world");
    const container=document.querySelector(".container");
    container.style.display="grid";
})
