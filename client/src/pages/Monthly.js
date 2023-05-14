"use client";

import Navbar from '../components/navbar'
import "../styles/style.css"


export default function Home() {

    let theme = '';


    if(localStorage.getItem("theme") == "light"){
        theme = "light";
    }
   else{
    theme = "dark";
   }
    return (
        <>
        <div className={`container-monthly ${theme}`}>
        <Navbar/>
            <div className="monthTab">
                <div className="months">
                <span class="material-symbols-outlined md1">
keyboard_double_arrow_right
</span>
                
                <h1 className="headings position">March</h1>
                
<span className="material-symbols-outlined md2">
keyboard_double_arrow_left
</span>
                </div>
                <div className="statistics">
                <div className="bar oops">
                    <div className="bar-color"></div>
                    <img
                    className="img2"
                    src="https://cdn-icons-png.flaticon.com/128/520/520470.png"
                    alt=""
                    />
                    <p className="name1 ">Oops</p>
                    <p className="money">$3.15</p>
                </div>
                <div className="bar">
                    <div className="bar-color clr1"></div>
                    <img
                    className="img2"
                    src="https://cdn-icons-png.flaticon.com/256/7152/7152394.png"
                    alt=""
                    />
                    <p className="name1 ">Intentional</p>
                    <p className="money">$25.15</p>
                </div>
                <h2>Categories</h2>
                <div className="categories">
                    <div className="bar oops">
                    <div className="bar-color clr2"></div>
                    <img
                        className="img2"
                        src="https://cdn-icons-png.flaticon.com/256/4359/4359922.png"
                        alt=""
                    />
                    <p className="name1 ">Food</p>
                    <p className="money">$3.15</p>
                    </div>
                    <div className="bar oops">
                    <div className="bar-color clr3"></div>
                    <img
                        className="img2"
                        src="https://cdn-icons-png.flaticon.com/256/9616/9616987.png"
                        alt=""
                    />
                    <p className="name1 ">Clothes</p>
                    <p className="money">$3.15</p>
                    </div>
                </div>
                </div>
            </div>
</div>

        </>
    )
}