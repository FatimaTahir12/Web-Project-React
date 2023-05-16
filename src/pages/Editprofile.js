import Navbar from '../components/navbar'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Home() 
{
    const { username } = useParams();

    const [newUser, setNewUser] = useState({
        username: username,
        new_name: '',
        new_password: '',
    });

    // const [originalUser, setOriginalUser] = useState({
    //     name: '',
    //     username: ''
    // });

    
    // const getUser = async() => {
    //     // e.preventDefault();
    // try {
    //     const response = await axios.get('/user', {username: username}).then((res) => {
    //         console.log(res.data);
    //         if (res.status === 200) {
    //             console.log("success");
    //             setOriginalUser({...originalUser, username: res.data.username});
    //             setOriginalUser({...originalUser, name: res.data.name});
    //         }
    //     });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const editProfile = async(e) => {
        e.preventDefault();
        // getUser();
        try {
            console.log(newUser.username)
            console.log(newUser.new_name)
            console.log(newUser.new_password)
            const response = await axios.post('/update-profile', newUser).then((res) => {
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
                <Navbar username={username}/>

                <h2 className="todayH2">Edit Profile</h2>
                <div className='edit-profile-inputs'>

                    <h2 className="editCat setTop">Full Name</h2>
                    <input className='setTop-input' onChange={(e) => onValueChange(e)} name='new_name' value={newUser.new_name}/>
                    <h2 className="editCat setTop">Password</h2>
                    <input className='setTop-input' onChange={(e) => onValueChange(e)} name='new_password' value={newUser.new_password}/>
                </div>
                <button className="btn addBtn setbtn" onClick={(e) => editProfile(e)}>Edit</button>
            </div>
        </>
    )
}