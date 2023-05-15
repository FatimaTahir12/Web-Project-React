import Navbar from '../components/navbar'
import axios from 'axios';
import { get } from 'mongoose';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


export default function Home() 
{

    const [newUser, setNewUser] = useState({
        new_name: '',
        new_password: '',
    });

    const [originalUser, setOriginalUser] = useState({
        name: '',
        password: '',
        username: ''
    });

    
    const getUser = async(e) => {
        e.preventDefault();
    try {
        const response = await axios.get('/user').then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                console.log("success");
                setOriginalUser(res.data);
            }
        });
        } catch (error) {
            console.log(error);
        }
    }

    const editProfile = async(e) => {
        e.preventDefault();
        getUser(e);
        try {
            const response = await axios.post('/update-profile', {username: originalUser.username, new_name: newUser.new_name, new_password: newUser.new_password}).then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    console.log("success");
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    let theme = '';


    if(localStorage.getItem("theme") == "light"){
        theme = "light";
    }
   else{
    theme = "dark";
   }

    return(
    <>
        <div className="container-addNew">
        <Navbar/>

        <h2 className="todayH2">Edit Profile</h2>
        <div className='edit-profile-inputs'>

        <h2 className="editCat setTop">Full Name</h2>
        <input className='setTop-input' onChange={(e) => onValueChange(e)} name='name' value={newUser.new_name}/>
        <h2 className="editCat setTop">Password</h2>
        <input className='setTop-input' onChange={(e) => onValueChange(e)} name='password' value={newUser.new_password}/>
            </div>
                <button className="btn addBtn setbtn" onClick={(e) => editProfile(e)}>Edit</button>
            </div>
        </>
    )
}