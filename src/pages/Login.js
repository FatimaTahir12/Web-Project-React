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


export default function Home() {

    const { segment } = useSpeechContext();
    const [data, setData] = useState({
    name: "",
    username: "",
    password: ""
  });
    
  const handleChange = (e, key) => setData({ ...data, [key]: e.target.value });
  const [toggle, setToggle] = useState(false)

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

  <BigTranscript placement="top" />
      <PushToTalkButton placement="bottom" captureKey=" " powerOn="auto" />
      <IntroPopup />
      
        <div className="card" id="card">
        <div className="front">
            <h1>Welcome Back!</h1>
            <form method="post" action="">
            <div className="fields">
            
                <input type="text" className="name one" placeholder="Username" autoComplete="new-password"/>
                <input type="password" className="pass one" placeholder="Password" autoComplete="new-password"/>
                <a href="" className="forgotPassword">
                Forgot Password?
                </a>


                <button className="login" onClick={(e) => logInUser(e)}>Log in</button>


                <hr />
                <div className="or">OR</div>
                <p className="login_">Log in with:</p>
                <div className="links">
                <button className="box">
                    <img src="https://i.ibb.co/9hMr7Lm/google-filled.png" alt="sign up with google" />
                </button>
                <button className="box">
                    <img src="https://i.ibb.co/vBjsvZT/icons8-facebook-240.png" alt="sign up with facebook" />
                </button>
                <button className="box">
                    <img src="https://i.ibb.co/Rz7RCNN/icons8-mail-150.png" alt="sign up with mail" />
                </button>
                </div>
                <p className="notRegistered">
                Not registered? <span onClick={flip}>Create an account</span>
                </p>
            </div>
            </form>
        </div>
        <div className="back">
            <h1>Sign Up</h1>
            <button onClick={() => setToggle(!toggle)} >Use Voice</button>
            <form method="post" action="" id="signUp">
            
            <div className="fields field_one">
            {!toggle && (
              <>
           {/* <VoiceInput
            changeOnEntityType={data.name}
            value={data.name}
            onChange={(e) => handleChange(e, "name")}
    />*/}
               <input type="text" className="name one" placeholder="Username" />
             {/*  <VoiceInput
            changeOnEntityType={data.email_address}
            value={data.email_address}
            onChange={(e) => handleChange(e, "name")}
  />*/}
                <input type="text" className="name one" placeholder="Email" />
               {/* <VoiceInput
            changeOnEntityType={data.password}
            value={data.password}
            onChange={(e) => handleChange(e, "name")}
/>*/}
                <input type="text" className="name one" placeholder="Password" />
                <input
                type="text"
                className="name one"
                placeholder="Confirm Password"
                />
                </>
                
)
            }
{toggle && (
  <div className="Form">
  <VoiceInput changeOnEntityType={data.name} value={data.name} onChange={(e) => handleChange(e, "name")}
    />
    <VoiceInput
    changeOnEntityType={data.email_address}
    value={data.email_address}
    onChange={(e) => handleChange(e, "name")}
/>
<VoiceInput
            changeOnEntityType={data.password}
            value={data.password}
            onChange={(e) => handleChange(e, "name")}
/>
</div>

)}
                <button className="login" onClick={() => signUpUser()}>Sign Up</button>
               
                <hr className="back_" />
                <div className="or back_one">OR</div>
                <p className="signup">Sign up with:</p>
                <div className="links link_one">
                <button className="box">
                    <img src="https://i.ibb.co/9hMr7Lm/google-filled.png" alt="sign up with google" />
                </button>
                <button className="box">
                    <img src="https://i.ibb.co/vBjsvZT/icons8-facebook-240.png" alt="sign up with facebook" />
                </button>
                <button className="box">
                    <img src="https://i.ibb.co/Rz7RCNN/icons8-mail-150.png" alt="sign up with mail" />
                </button>
                </div>
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