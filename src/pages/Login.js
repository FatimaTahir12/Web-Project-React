"use client";

import { login_signUp, flip }  from "../script"   
import "../styles/style(signUp).css"

import { useEffect, useState } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
    PushToTalkButton,
    BigTranscript,
    IntroPopup,
  } from "@speechly/react-ui";
  import { VoiceInput, VoiceDatePicker } from "@speechly/react-voice-forms";
import "@speechly/react-voice-forms/css/theme/mui.css";


const signupInitialValues = {
  name: '',
  username: '',
  password: '',
};

const loginInitialValues = {
  username: '',
  password: '',
};

export default function Home() {

    const { segment } = useSpeechContext();
   
    
  const handleChange = (e, key) => setData({ ...data, [key]: e.target.value });
  const [toggle, setToggle] = useState(false);
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
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


  useEffect(() => {
    if (segment) {
      if (segment.entities) {
        segment.entities.forEach((entity) => {
          console.log(entity.type, entity.value);
          setData((data) => ({ ...data, [entity.type]: entity.value }));
        });
      }
      if (segment.isFinal) {
        if (segment.entities) {
          segment.entities.forEach((entity) => {
            console.log("✅", entity.type, entity.value);
            setData((data) => ({ ...data, [entity.type]: entity.value }));
          });
        }
      }
    }
  }, [segment]);


  const dum =
  {
    username: "",
    password: ""
  }

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
      const response = await axios.post('/login', {
        "username": "hussainarslan",
        "password": "hussain"
      });
      console.log(response);
      if (response.data.status === "success") {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signUpUser = async () => {
    dum.name = 'Test';
    dum.username = 'Test';
    dum.password = 'Test';


    try {
      const response = await axios.post('http://localhost:5000/register', dum);
      console.log(response);
      if (response.data.status === "success") {
        console.log("success"); 
      }
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
            value={login.username} placeholder="Username" autoComplete="new-password" />
                <input type="password" className="pass one"onChange={(e)=> onValueChange(e)}
            name="password"  value={login.password}  placeholder="Password" autoComplete="new-password"/>
                <button className="login" onClick={() => loginUser()}>Log in</button>             
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
                
                <button className="login" onClick={() => signUpUser()}>Sign Up</button>
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