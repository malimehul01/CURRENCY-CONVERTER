let BASE_URL="https://api.frankfurter.app/latest?";
let dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
let fromcurr=document.querySelector(".From select");
let tocurr=document.querySelector(".to select");

for(let select of dropdown){

    for(let code in countryList){
       

        let newOption=document.createElement("option");
        newOption.innerHTML=code;
        newOption.value=code;
       

        if(select.name==="From" && code==="USD"){

          newOption.selected="selected";

        }
        else if(select.name==="To" && code==="INR"){


            newOption.selected="selected";
        }
           select.append(newOption);
    }
    
      select.addEventListener("change",(evt)=>{



        uppdateFLag(evt.target);
      })
}


const uppdateFLag=(element)=>{
 
    let currcode=element.value; 
   
    let countrycode=countryList[currcode];
   
    let  newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
 
     let img=element.parentElement.querySelector("img");
  
    img.src=newsrc; 

    




}

btn.addEventListener ("click",async(evt)=>{

evt.preventDefault();

let amount=document.querySelector(".amount input");
let amountval=amount.value;
let msg= document.querySelector(".msg");

if(amountval===""|| amountval<1 ){
    
    amountval=1;
    amount.value="1";

}
 
const URL=`${BASE_URL}from=${fromcurr.value}&to=${tocurr.value}`;
 let response= await fetch(URL);
 let data= await response.json(); 
 let rate=await data.rates[tocurr.value]; 
 console.log(rate);
 let finalamount=amount.value*rate;

 console.log(finalamount);

 msg.innerHTML=`${amountval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
})