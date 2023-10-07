let inp = document.querySelector("input");
let buttons = document.querySelectorAll(".btn");
let clear = document.getElementById("clear");
let equal = document.querySelector(".equal");
let sign = document.querySelectorAll(".btn-s")

buttons.forEach(function(button) {
    button.addEventListener('click',function(e){
        let value = e.target.dataset.num;
        console.log(value);
        inp.value +=value ;
    });
});

clear.addEventListener("click", function(){
    inp.value="";
});

equal.addEventListener("click", function(){
    if(inp.value === ""){
        inp.value = "";
        alert("First Give Some Value On Your Calculator Then Press = ")
    }else{
        let ans = eval(inp.value);
        console.log(inp.value);
        inp.value = ans;
    }
});


sign.forEach(function(buton){
    buton.addEventListener("click", function(e){
        let val = e.target.dataset.num;
        inp.value += val;
        console.log(val);
    });
});