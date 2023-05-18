"use client";
import { togglePopUp}  from "../script"  
import "../styles/style.css"  
import Navbar from '../components/navbar'
import React, {useState, useEffect} from 'react';
import Popup from '../components/popup';
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const { username } = useParams();
  const[items, setItems] = useState([])
  const [newPrice, setPrice] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [goalIndex, setNewGoalIndex] = useState("");
  const [newCategory, setCategory] = useState("");
  const [isOpen_2, setIsOpen_2] = useState(false);
  const [isOpen_3, setIsOpen_3] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editPriority, setEditPriority] = useState('');
  const [goalCategory, setGoalCategory] = useState("");
  const [toggle, setToggle] = useState(true);
  const [list, setList] = useState([]);
  const [Error, setError] = useState(false);

{/**Rakeen key functions */}

useEffect(() => {
  updateAddNew();
  console.log(list);
}, []);

const postCategoriesAndPrice = () => {

}

const updateAmount = () => {
  
}

const updateGoal = async () => {
  try {
    console.log(username);
    console.log(newGoal);
    console.log(goalCategory.category);
    const response = await axios.post('/add-goal', {username: username, amount: newGoal, category: goalCategory.category }).then((res) => { 
      console.log(res.data);
      console.log(res.status);
      if (res.status === 200 || res.status === 201) {
        console.log("success"); 
      }
    });
  } catch (error) {
    console.log(error);
  }
}


//username, category, expnse_amount, goal_amount
const updateAddNew = async () => {
  try {
    console.log(username);
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

  function handleClick(event){

    setCategory(event.currentTarget.id);
  }

  const togglePopup2 = (e) => {
    setIsOpen_2(!isOpen_2);
    const isButton = e.target.nodeName === 'BUTTON';

    if (!isButton) return;
    handleAmountChange();
  };

  const togglePopup3 = (e) => {
    setError(false)
    setIsOpen_3(!isOpen_3);
    const isButton = e.target.nodeName === 'BUTTON';
    
    
    if (!isButton) return;
    handleGoalChange();
  };

  function showEntry(){
    togglePopUp();
    AddEntry();  
    postCategoriesAndPrice();
    addExpense();
  }

  function showEntry_2(){
    togglePopup_2();
    //Edit;
  }

  
  const handleDelete = (index) => {
    const updatedList = [...list];
  //  updatedList[index].goal = "";
    updatedList.splice(index, 1);
    
    setList(updatedList);
  };

  const AddEntry = () => {

  const prevCategory  = list.findIndex(list => list.category === newCategory);

  if(prevCategory == -1){

    if (newCategory.trim() !== "") {
      setList([
        ...list,
        {
          expense_amount: newPrice,
          category: newCategory,
          goal_amount: newGoal,
        //  percentage: 0,
        },
      ]);
      setPrice("");
      setCategory("");
      setNewGoal("");
    }
  }else{

        const updatedList = [...list];
        const temp1 = parseFloat(updatedList[prevCategory].expense_amount);
        const temp2 = parseFloat(newPrice);
        updatedList[prevCategory].expense_amount = temp1 + temp2;
        setItems(updatedList);
    }
}


const blaaahh = (index, entry) => {
  setEditingIndex(index);
//  setCategory_2(entry);
  setIsOpen_2(true);
};

const addGoal = (index, entry) => {
  setGoalCategory(entry);
  setNewGoalIndex(index);
  setNewGoal(entry);

  //handleGoalChange();
 // updateGoal(); 
  setIsOpen_3(true);

}

const handleAmountChange = () => {
  const newItemList = [...items];
  newItemList[editingIndex].price = editPriority;
  setItems(newItemList);
  setIsOpen_2(false);
  updateAmount();
  
};

const handleGoalChange = (event) => {

  
  const newItemList = [...list];
{/*  newItemList[goalIndex].goal_amount = newGoal;
  setList(newItemList);
  updateGoal(); 
  setError(false);
  setIsOpen_3(!isOpen_3);
*/}
  if(parseInt(newGoal) > parseInt(newItemList[goalIndex].expense_amount) ){
  
  setError(false)
  newItemList[goalIndex].goal_amount = newGoal;
  setItems(newItemList);
  updateGoal(); 
  setIsOpen_3(!isOpen_3);
  
  }else{
    setIsOpen_3(isOpen_3);
    setError(true);
  }
};

const togglePopup_2 = e => {
  setIsOpen(!isOpen);

  const isButton = e.target.nodeName === 'BUTTON';

  if(!isButton) 
    return
}

const colorChange = (x) => {

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

const newPopUp = () =>{
  togglePopUp();
  setToggle(true);
}

  let theme = '';
  if(localStorage.getItem("theme") == "light"){
      theme = "light";
  }
  else{
     theme = "dark";
  }

  const addExpense = async() => {
    try {
        console.log(username);
        console.log(newPrice);
        console.log(newCategory);
        const response = await axios.post('/add-expense', {username: username, amount: newPrice, category: newCategory}).then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                console.log("success");
            }
        });
    } catch (error) {
        console.log(error);
    }
  }


  return (      
    <>
      <div className={`container-addNew ${theme}`} >
      <Navbar username={username}/>
      <div className="todayTab">
        <h2 className="todayH2">Today's Expenditures</h2>   
        <button
          className="btn add "
          id="show-login"
          onClick={newPopUp}
          value={0}
        >
          <span className="material-symbols-outlined">
          add
          </span>
      </button>

    <div className="added">
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

          <div className="edit-delete">

            <button className="btn add" id=""  value={0} onClick={() => { addGoal(index, entry) }}>
              <span class="material-symbols-outlined">
              edit
              </span>
            </button>

            <button className="btn add" id="" onClick={() => handleDelete(index)} value={0}>
              <span className="material-symbols-outlined">
              delete
              </span>
            </button>
          </div>
        </div>
       </div>

         ))}
    </div>

    {isOpen_3 && <Popup content={<>
     
      <div className='inputFields'>
        <h2 className="h_2 heading-popup">Add Goal</h2>
        <h2 className="editCat">Category selected: {goalCategory.category}</h2>
          <input id="input_2"
              onChange={(e) => setNewGoal(e.target.value)}/>
          {Error && <h5>You can only add a goal larger than the amount </h5>}
          <button className="submit_2 btn addBtn" id="goal_btn" onClick={handleGoalChange}>submit</button>
      </div>

      </>}
      handleClose={togglePopup3}
    />}


    <div className="popup" id="popup-1">
      <div className="overlay" />
         
      <div className="addBook">
        <div className="close-btn" onClick={togglePopUp}>
          ×
        </div>
        {!toggle && (
          <>
        <h3 className="heading-popup heading-newCat">New Category</h3>
        <input id="input_3" placeholder="Enter a new category" onChange={(e) => setCategory(e.target.value)}/>
        <button className="btn addBtn submitcat" id="submit" type="submit" onClick={showEntry}>
          Submit
        </button>
        <button className="btn addBtn goback" id="submit" type="submit" onClick={() => {setToggle(true)}}>
          Go back
        </button>
        </>
      )}
        {toggle && (
        <fieldset>
          <input
          name='newPrice'
            type="text"
            id="newPrice"
            placeholder="Enter Amount"
            required="" value={newPrice}
            onChange={(e) => setPrice(e.target.value)}
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
              <button className="btn add addNew" id="show-login" onClick={() => setToggle(!toggle)}  value={0} >
                <span className="material-symbols-outlined">
                add
                </span>
              </button>
          </div>        
        </fieldset>
        )}
        {toggle && (
        <button className="btn addBtn" id="submit" type="submit" onClick={showEntry}>
          Submit
        </button>
        )}    
      </div>   
    </div>
    <div className="popup" id="popup-2">
      <div className="overlay" />
      <div className="addBook">
        <div className="close-btn">
          ×
        </div>
        <fieldset>
          <input
            type="text"
            id="title"
            placeholder="Enter Amount"
            required="" value={newPrice}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />

        </fieldset>
        <button
          className="btn addBtn"
          id="submit"
          type="submit"
          onClick={showEntry_2}
        >
          Submit
        </button>
      </div>
    </div>

  </div>
</div>

        </>
    )
}