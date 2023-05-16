"use client";
import React, { createContext, useState, useEffect } from 'react';

//import {btnClicked }  from "../script"   
import "../styles/style.css"
import Navbar from '../components/navbar'
import axios from 'axios';
import { togglePopUp, togglePopUp2 }  from "../script"  
import { useLocation, useParams } from 'react-router-dom';
import PieChart from '../components/PieChart';
export const ThemeContext = createContext(null);

export default function Home(props) {
  // const {state} = useLocation();
  const { username } = useParams(); // Read values passed on state



  function handleClick(event){
    //setCategory(event.currentTarget.id);
  } 

  function showEntry(){
  togglePopUp();
  //AddEntry();  
  }


  /*const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem("theme", "dark");
     
    } else {
      setTheme('light');
      localStorage.setItem("theme", "light");
    
    }

    
  };
  */

  const [theme, setTheme] = useState('light');
  const [icon, setIcon] = useState(<span className="material-symbols-outlined">
  light_mode
  </span>)

    useEffect(() => {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      }
      fetchRandomWord();
    }, []);

    const [word, setWord] = useState('');

    const fetchRandomWord = async () => {
      try {
        const response = await axios.get('https://random-word-api.vercel.app/api?words=1');
        const randomWord = response.data[0];
        setWord(randomWord);
      } catch (error) {
        console.error('Error fetching random word:', error);
      }
    };
    
    function toggleTheme() {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);

      if (icon.type === "span") {
        setIcon(<span className="material-symbols-outlined">
        dark_mode
        </span>);
      } else {
        setIcon(<span className="material-symbols-outlined">
        light_mode
        </span>);
      }
    }

      return (
          <>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <div className={`container ${theme}  `}>
    <div className="header">
      <div className="nameplate" id="nameplate">
        {/* <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW1p196FdFnjs53-qod0Iv6TbQwPWf3M4yZTRbJHH9KQ&s"
          alt=""
          className="img1"
        /> */}
        <h1 className="one">{username}</h1>
      </div>
      <button className="settings btn" id="btn"  onClick={togglePopUp}>
      <span className="material-symbols-outlined">
  add
  </span>
      </button>
      <button
        className="mode btn"
        id="btn_sunny"
        onClick={toggleTheme}
        value={0}
      >
        {icon}
      </button>
    </div>
  <Navbar  username={username}/>
    <div className="Main">
      <div className="recent" id="recent">
        <h1 className="headings ">Notification</h1>
      </div>
      <div className="monthly" id="monthly">
        <h1 className="headings">Recent Transactions</h1>
        
      </div>
    </div>
    <div className="Aside">
      <div className="budget" id="budget">
        <h1 className="headings">Current Spendings</h1>
        <div style={{position:"relative", width:"250px", height:"300px", margin:"auto", paddingTop:"10%"}}>
          <PieChart username= {username}/>
        </div>
      </div>
      <div className="accounts" id="accounts">
        <h1 className="headings">Word of the Day!</h1>
        <div className="word" style={{width:"50%", height:"50%"}}>
          <h1 className="word-heading" style={{color: "brown"}}>{word}</h1>
        </div>
      </div>
    </div>



    <div className="popup" id="popup-1">
        <div className="overlay" />
        <div className="addBook">
          <div className="close-btn" onClick={togglePopUp}>
            ×
          </div>
          <fieldset>
            <input
              type="text"
              id="title"
              placeholder="Enter Amount"
              required=""
            />
            <br/>
            <h3 className="heading-popup">Pick a category</h3>
            <div className="categories-popup" id="style-2">
              <button className="clothes-div item btn" id="Clothes" onClick={handleClick}>
                <div className="colorplate">
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/9616/9616987.png"
                    className="item-image"
                    alt=""
                  />
                  <p className="item-desc">Clothes</p>
                </div>
              </button>
              <button className="travel-div item btn" id="Travel" onClick={handleClick}>
                <div
                  className="colorplate"
                  style={{ backgroundColor: "#ada55c67" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/8136/8136650.png"
                    className="item-image"
                    alt=""
                  />
                  <p className="item-desc">Travel</p>
                </div>
              </button>
              <button className="food-div item btn" id="Food" onClick={handleClick}>
                <div
                  className="colorplate"
                  style={{ backgroundColor: "#5c70ad67" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/4359/4359633.png"
                    className="item-image"
                    alt=""
                  />
                  <p className="item-desc">Food</p>
                </div>
              </button>
              <button className="entertainment-div item btn" id="Entertainment" onClick={handleClick}>
                <div
                  className="colorplate"
                  style={{ backgroundColor: "#875cad67" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/256/7170/7170790.png"
                    className="item-image"
                    alt=""
                  />
                  <p className="item-desc">Entertainment</p>
                </div>
              </button>
              <button className="loans-div item btn" id="Loans" onClick={handleClick}><div
                  className="colorplate"
                  style={{ backgroundColor: "#9b5cad67" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2168/2168799.png"
                    className="item-image"
                    alt=""
                  />
                  <p className="item-desc">Loans</p>
                </div></button>
              <button className="shopping-div item btn" id="Shopping" onClick={handleClick}><div
                  className="colorplate"
                  style={{ backgroundColor: "#875cad67" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
                    className="item-image"
                    alt=""
                  />
                  <p className="item-desc">Shopping</p>
                </div></button>
              
              <button className="groceries-div item btn" id="Groceries" onClick={handleClick}><div
                  className="colorplate"
                  style={{ backgroundColor: "#875cad67" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1261/1261126.png"
                    className="item-image"
                    alt=""
                  />
                  <p className="item-desc">Groceries</p>
                </div></button>
                
              <button className="beverages-div item btn" id="Beverages" onClick={handleClick}><div
                  className="colorplate"
                  style={{ backgroundColor: "#875cad67" }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3050/3050130.png"
                    className="item-image"
                    alt=""
                  />
                  <p className="item-desc">Beverages</p>
                </div></button>
              <button className="btn add toggle addNew" id="show-login" onClick={togglePopUp} value={0} >
              <span className="material-symbols-outlined">
  add
  </span>
              </button>
            </div>
          </fieldset>
          <button className="btn addBtn" id="submit" type="submit" onClick={showEntry}>
            Submit
          </button>
        </div>
      </div>

  </div>
  </ThemeContext.Provider>
          </>
      )
}