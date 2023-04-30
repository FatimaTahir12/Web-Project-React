"use client";

export function togglePopUp(){ //for the pop up form 
    document.getElementById("popup-1").classList.toggle("active");
  }

export function togglePopUp2(){ //for the pop up form 
    document.getElementById("popup-2").classList.toggle("active");
  }
  
function lightModeActivate(){

    if(typeof window !== 'undefined'){

        window.addEventListener("load", ()=>{
           
    var body = document.getElementById("BODY");
    body.classList.remove("body_dark");

    var nav = document.getElementById("nav");
    nav.classList.remove("nav_dark");

    var recent = document.getElementById("recent");
    recent.classList.remove("recent_dark");

    var monthly = document.getElementById("monthly");
    monthly.classList.remove("monthly_dark");

    var budget = document.getElementById("budget");
    budget.classList.remove("budget_dark");

    var accounts = document.getElementById("accounts");
    accounts.classList.remove("accounts_dark");

    var settings = document.getElementById("btn");
    settings.classList.remove("settings_dark");

    var mode = document.getElementById("btn_sunny");
    mode.classList.remove("mode_dark");

    var nameplate = document.getElementById("nameplate");
    nameplate.classList.remove("nameplate_dark");

 
    var navbar = document.getElementById("navbar");
    navbar.classList.remove("navbar_dark")

   
});
    }
}

function darkModeActivate(){

    if(typeof window !== 'undefined'){

        window.addEventListener("load", ()=>{
    var body = document.getElementById("BODY");
    body.classList.add("body_dark");

    var nav = document.getElementById("nav");
    nav.classList.add("nav_dark");

    var recent = document.getElementById("recent");
    recent.classList.add("recent_dark");

    var monthly = document.getElementById("monthly");
    monthly.classList.add("monthly_dark");

    var budget = document.getElementById("budget");
    budget.classList.add("budget_dark");

    var accounts = document.getElementById("accounts");
    accounts.classList.add("accounts_dark");

    var settings = document.getElementById("btn");
    settings.classList.add("settings_dark");

    var mode = document.getElementById("btn_sunny");
    mode.classList.add("mode_dark");

    var nameplate = document.getElementById("nameplate");
    nameplate.classList.add("nameplate_dark");

   
    var navbar = document.getElementById("navbar");
    navbar.classList.add("navbar_dark")

});
    }
}


function btnClicked(){

    if(typeof window !== 'undefined'){

    if( document.getElementById("btn_sunny").value === "0"){

        document.getElementById("btn_sunny").innerHTML = `<span class="material-symbols-outlined">
        clear_night
        </span>`
        document.getElementById("btn_sunny").value = 1;
        darkModeActivate();
        localStorage.setItem("theme", 0)
    

    }else{

        document.getElementById("btn_sunny").innerHTML = `<span class="material-symbols-outlined">
        wb_sunny
        </span>`
        document.getElementById("btn_sunny").value = 0;
        lightModeActivate();
        localStorage.setItem("theme", 1)
    }
    document.body.classList.toggle("lightTheme");
}


}

let card ;

export function login_signUp()
{
    if(typeof window !== 'undefined'){

        if(document.getElementById("signUp")){
    document.getElementById("signUp").addEventListener("submit", function(event){
        card.style.transform = 'rotateY(0deg)';
        event.preventDefault(); 
    });
        }
    card = document.getElementById('card');
}
}
export function flip()
{
    if(typeof window !== 'undefined'){
    document.getElementById('card').style.transform = 'rotateY(180deg)';
    }
}

export function openLogin()
{
    window.open('login.html','_self')
}

function checkToggle(){
    
  if(localStorage.getItem("theme") == 0){
        document.body.classList.toggle("lightTheme");
    }
   else{
    document.body.classList.toggle(":root");
   }


};