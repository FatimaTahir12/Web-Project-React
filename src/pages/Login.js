"use client";
import props from 'prop-types';
import { login_signUp, flip }  from "../script"   
import "../styles/style(signUp).css"
import { useNavigation, useNavigate, useNavigationType } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
    PushToTalkButton,
    BigTranscript,
    IntroPopup,
  } from "@speechly/react-ui";
  import { VoiceInput, VoiceDatePicker } from "@speechly/react-voice-forms";
import "@speechly/react-voice-forms/css/theme/mui.css";
import axios from "axios";



export default function Home() {

  const { segment } = useSpeechContext();
  
  const navigate = useNavigate();
    
  const [toggle, setToggle] = useState(false);
  const [loginData, setLogin] = useState({
    username: '',
    password: '',
  });

  const [signupData, setSignup] = useState({
    name: '',
    username: '',
    password: '',
  });

  const onInputChange = (event) => {
    setSignup({ ...signupData, [event.target.name]: event.target.value });
  };
  
  const onValueChange = (event) => {
    setLogin({ ...loginData, [event.target.name]: event.target.value });
  };

  // const handleRegister = async (event) => {
  //   event.preventDefault();
  //   try {
      
  //     await registerUser(data);
  //     // Handle successful registration
  //   } catch (error) {
  //     // Handle registration error
  //   }
  // };

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   try {
  //     // Call loginUser function with form data
  //     await loginUser(data);
  //     // Handle successful login
  //   } catch (error) {
  //     // Handle login error
  //   }
  // };


  // useEffect(() => {
  //   if (segment) {
  //     if (segment.entities) {
  //       segment.entities.forEach((entity) => {
  //         console.log(entity.type, entity.value);
  //         setData((data) => ({ ...data, [entity.type]: entity.value }));
  //       });
  //     }
  //     if (segment.isFinal) {
  //       if (segment.entities) {
  //         segment.entities.forEach((entity) => {
  //           console.log("✅", entity.type, entity.value);
  //           setData((data) => ({ ...data, [entity.type]: entity.value }));
  //         });
  //       }
  //     }
  //   }
  // }, [segment]);



  // const logInUser = async () => {

    
  //   try {
  //     const response = await axios.post('http://localhost:5000/login', {"username": "hussainarslan", "password": "hussain"});
  //     console.log(response);
  //     if (response.data.status === "success") {
  //       console.log("success");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const logInUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', loginData).then((res) => { 
        console.log(res.data);
        if (res.status === 200) {
          console.log("success"); 
          navigate(`/dashboard/${loginData.username}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const signUpUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', signupData).then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          console.log("success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

    return (

       <div onLoad={login_signUp()}>
 
        <div className="card" id="card">
        <div className="front">
            <h1>Welcome Back!</h1>
            <form method="post" action="">
            <div className="fields">
            
                <input type="text" className="name one" onChange={(e)=> onValueChange(e)}
              name="username"

            value={loginData.username} placeholder="Username" autoComplete="new-password" />
                <input type="password" className="pass one" onChange={(e)=> onValueChange(e)}
            name="password"  value={loginData.password}  placeholder="Password" autoComplete="new-password"/>
                <button className="login" onClick={(e) => logInUser(e)}>Log in</button>             

                <p className="notRegistered">
                Not registered? <span onClick={flip}>Create an account</span>
                </p>
            </div>
            </form>
        </div>
        <div className="back">
            <h1>Sign Up</h1>
          
            <form method="post" action="" id="signUp">
            
            <div className="fields field_one">
          
              <>
               <input type="text" className="name one" onChange={(e) => onInputChange(e)} name='username' placeholder="Username" />
           
                <input type="text" className="name one" onChange={(e) => onInputChange(e)} name='name' placeholder="name" />
          
                <input type="text" className="name one" onChange={(e) => onInputChange(e)} name='password' placeholder="Password" />
                </>
                
                <button className="login" onClick={(e) => signUpUser(e)}>Sign Up</button>
                <p className="notRegistered last_one">
                Already registered?{" "}
                <button className="last" onClick={flip}>
                    Log in
                </button>
                </p>
            </div>
            </form>
        </div>
        </div>

       </div>
    )
}