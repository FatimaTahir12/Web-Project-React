import Navbar from '../components/navbar'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const initialValue = {
    name: '',
    password: '',
}



export default function Home() {
    const navigate = useNavigate();


    const [user, setUser] = useState(initialValue);
    const { name, password } = user;

    // const editProfile = async() => {
    //     const response = await editUser(id, user);
    //     navigate('/all');
    // }

    // const logInUser = async (e) => {
    //     e.preventDefault();
    //     try {
    //       const response = await axios.post('/login', loginData).then((res) => { 
    //         console.log(res.data);
    //         if (res.status === 200) {
    //           console.log("success"); 
    //           navigate('/', { user:loginData.username});
    //         }
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    const editProfile = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/update-profile', user).then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    console.log("success");
                    navigate('/', { user: user.name });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    let theme = '';


    if(localStorage.getItem("theme") == "light"){
        theme = "light";
    }
   else{
    theme = "dark";
   }

    // return (
    //     <>
    //      <div className={container-addNew ${theme}}>
    //     <Navbar/>

    //     <h2 className="todayH2">Edit Profile</h2>
    //     <div className='edit-profile-inputs'>

    //        <h2 className="editCat setTop">Full Name</h2>
    //        <input className='setTop-input' onChange={(e) => onValueChange(e)} name='name' value={name}/>
    //        <h2 className="editCat setTop">Password</h2>
    //        <input className='setTop-input' onChange={(e) => onValueChange(e)} name='password' value={password}/>
    //         </div>
    //         <button className="btn addBtn setbtn" onClick={(e) => editProfile(e)}>Edit</button>
    //     </>
    // )
}