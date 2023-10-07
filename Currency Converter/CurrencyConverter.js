// const dropList=document.querySelectorAll(".drop-list select");
// const fromCurrency=document.querySelectorAll(".from select");
// const toCurrency=document.querySelectorAll(".to select");
// //const dropList=document.querySelectorAll(".drop-list select");
// getButton=document.querySelectorAll("form button");
// for(let i=0;i<dropList.length;i++){
// for(currency_code in country_list)
// {
//     let selected;
//     if(i==0){
//         selected = currency_code=="USD"?"selected":"";
//         }
//         else if(i==1){
//             selected=currency_code=="INR"?"selected":"";
//         }
// //console.log(currency_code)
// let optionTag=`<option value="${currency_code}" ${selected}>${currency_code}</option>`;
// dropList[i].insertAdjacentHTML("beforeend",optionTag);


// }
// }

// getButton.addEventListener("click",e=>{
//     e.preventDeafult();
//     getExchangeRate();
// });
// function getExchangeRate(){
//     const amount=document.querySelectorAll(".amount input");
//     let amountVal=amount.values;
//     if(amountVal==" "||amountVal=="0"){
//         amount.value="1";
//         amountVal=1;

//     }
//     let url=` https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
//  fetch(url).then(response=>console.log(response.json()));
// }


















const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "INR" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = ` https://v6.exchangerate-api.com/v6/070c76af09f5208830b83ed1/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong";
    });
}