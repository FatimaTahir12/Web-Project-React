"use client";

import { login_signUp, flip }  from "../script"   
import Dashboard from "../pages/Dashboard";
import AddNew from '../pages/AddNew';
import Login from '../pages/Login';
import Monthly from '../pages/Monthly'
import "../styles/style.css"

export default function Home(props) {
    return (
        <>
        <div className="Nav" id="nav">
    <div className="navbar" id="navbar">
      <div
        className="stats row"
       
        style={{ cursor: "pointer" }}
      >
      
      <span className="material-symbols-outlined md">
dashboard
</span>
        <a href='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <h3> Dashboard</h3>
        </a>
      </div>
      <div
        className="stats row"
     
        style={{ cursor: "pointer" }}
      >
        <span className="material-symbols-outlined md">
analytics
</span>
        <a href='/monthly' style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <h3> Monthly Stats</h3>
        </a>
      </div>
      <div className="stats row">
      <span className="material-symbols-outlined md">
add_box
</span>
        <a href='/addnew' style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <h3> Add New</h3>
        </a>
      </div>
      
      <div className="stats row">
      <span className="material-symbols-outlined md">
add_box
</span>
        <a href='/editprofile' style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <h3> Edit Profile</h3>
        </a>
      </div>

      <div className="stats row logout">
        
      <span className="material-symbols-outlined md">
logout
</span>
        <a href='/loginuser' style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <h3> Logout</h3>
        </a>
      </div>
    </div>
  </div>
        </>
    )
}