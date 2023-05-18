"use client";
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
//import {btnClicked }  from "../script"   
import "../styles/style.css"
import Navbar from '../components/navbar'
import { togglePopUp, togglePopUp2 }  from "../script"  
import { useLocation, useParams } from 'react-router-dom';
import PieChart from '../components/PieChart';
export const ThemeContext = createContext(null);

export default function Home(props) {
  // const {state} = useLocation();
  const { username } = useParams(); // Read values passed on state
  const [list, setList] = useState([]);

  const colorChange = (x) => {

    if(theme === 'dark'){

    if(x===0) return '#5ca2ad67'
    if(x===1) return '#70ad5c67'
    if(x===2) return '#5c64ad67' 
    if(x===3) return '#ad875c67'
    if(x===5) return '#ad5f5c67'  
    if(x===9) return '#5c70ad67'
    if(x===6) return '#915cad67'
    if(x===7) return '#ada55c67'
    if(x===8) return '#5cad9767'
    if(x===4) return '#9b5cad67'
    }

    if(theme === 'light'){

    if(x===0) return '#C70039 '
    if(x===1) return '#50A72C  '
    if(x===2) return '#2CA7A5  '
    if(x===3) return '#A52CA7  '
    if(x===4) return '#A7712C   '
    if(x===5) return '#A72C5B '
    if(x===6) return '#2C7CA7  '
    }
      
  }

  const pictureChange = (x) => {

    switch(x){
    case 'Clothes':  return 'https://cdn-icons-png.flaticon.com/256/9616/9616987.png'
    case 'Travel':  return 'https://cdn-icons-png.flaticon.com/256/8136/8136650.png'
    case 'Food':  return 'https://cdn-icons-png.flaticon.com/256/4359/4359633.png'
    case 'Entertainment':  return 'https://cdn-icons-png.flaticon.com/256/7170/7170790.png'
    case 'Loans':  return 'https://cdn-icons-png.flaticon.com/512/2168/2168799.png'
    case 'Shopping':  return 'https://cdn-icons-png.flaticon.com/512/2331/2331970.png'
    case 'Groceries':  return 'https://cdn-icons-png.flaticon.com/512/1261/1261126.png'
    case 'Beverages':  return 'https://cdn-icons-png.flaticon.com/512/3050/3050130.png'
    default: return 'https://cdn-icons-png.flaticon.com/128/6736/6736258.png'
    }
  }
    
  const [userData, setUserData] = useState([]);
  
  // const getUserUpdates = async(e) => {
  //   try {
  //       const response = await axios.post('/updates', {"username": username}).then((res) => {
  //           setUserData(...userData, res.data.map(function({category, goal_amount, expense_amount}) {if(((goal_amount - expense_amount)/goal_amount) > 0.8)  return [category, ((goal_amount - expense_amount)/goal_amount)*100] }));
  //           console.log(res.data);
  //           console.log(userData);
  //           if (res.status === 200) {
  //             // console.log("success")
  //           }
  //       });
  //   } catch (error) {
  //       console.log(error);
  //   }
  // }

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    try {
      const response = await axios.post('/updates', { username: username });
      if (response.status === 200) {
        const newList = response.data.map((item) => ({
          username: item.username,
          category: item.category,
          expense_amount: item.expense_amount,
          goal_amount: item.goal_amount,
        }));
        setList((prevList) => [...prevList, ...newList]);
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [data, setData] = useState([]); // Set initial state to null


  useEffect(() => {
    const filteredData = list.filter(({ goal_amount, expense_amount }) => {
      const progress = (goal_amount - expense_amount) / goal_amount;
      return progress > 0.8;
    });
  
    const mappedData = filteredData.map(({ category, goal_amount, expense_amount }) => {
      const progress = ((goal_amount - expense_amount) / goal_amount) * 100;
      return [category, progress];
    });
  
    setData(mappedData);
  }, [list]);
  
  

console.log(data);
  
  useEffect(() => {
    
      // getUserUpdates();
      
      // console.log(list.filter((v,i) => {
      //   return list.map((val)=> val.category).indexOf(v.category) == i
      // }))
      // const expenses = user.expenses.map(function({category, amount}) {return [category, amount]});
      
      // const goals = user.goals.map(function(item) {return [item.expense_category, item.amount]});
   

  }, [list]);

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

  const [theme, setTheme] = useState('dark');
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
          <div className={`container ${theme}  `} >
    <div className="header">
      <div className="nameplate" id="nameplate">
        {/* <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW1p196FdFnjs53-qod0Iv6TbQwPWf3M4yZTRbJHH9KQ&s"
          alt=""
          className="img1"
        /> */}
        <h1 className="one">{username}</h1>
      </div>

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
      <div className="recent" id="recent" >
        <h1 className="headings ">Notifications</h1>

        <div className="categories-popup pops noti" id="style-2">
        <div className="added dashboard-cat notif">
        {list.map((entry, index) =>{
          const percentage = Math.round(((entry.expense_amount)/entry.goal_amount)*100)
          if(entry.goal_amount === 0){
          return(<div key={index}>
            <p className='notifications'>You have not set a goal for category {entry.category}</p>
          </div>)
          }

          if(percentage >= 80){
          return(<div key={index}>
            <p className='notifications'>You have used up {percentage}% of your limit in category {entry.category}</p>
          </div>)
          }
          
        })}
        </div>
        </div>
      </div>
      <div className="monthly" id="monthly">
        <h1 className="headings">Transactions</h1>
        <div className="categories-popup pops" id="style-2">
        <div className="added dashboard-cat">
      {list.map((entry, index) => (
         <div key={index}>

          <div className="whole-row"> 
            <div className="bar oops">
            <div className="bar-color" style={{ width: `${(parseInt(entry.expense_amount)/parseInt(entry.goal_amount))*100}%`, backgroundColor:`${colorChange(index)}`}}></div>
            <img
              className="img2"
              src={pictureChange(entry.category)}
              alt=""
            />
            <p className="name1 ">{entry.category}</p>
            <p className="money">${entry.expense_amount} / ${entry.goal_amount}</p>
          </div>
        </div>
       </div>

         ))}

    </div>
    </div>
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