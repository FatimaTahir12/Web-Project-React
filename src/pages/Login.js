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
    password: "",
  });
    
  const handleChange = (e, key) => setData({ ...data, [key]: e.target.value });
  const [toggle, setToggle] = useState(false)

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

    return (

       <div onLoad={login_signUp()}>

{/*<BigTranscript placement="top" />
      <PushToTalkButton placement="bottom" captureKey=" " powerOn="auto" />
    <IntroPopup />*/}
      
        <div className="card" id="card">
        <div className="front">
            <h1>Welcome Back!</h1>
            <form method="post" action="">
            <div className="fields">
            
                <input type="text" className="name one" placeholder="Username" autoComplete="new-password" onFocus={(e) => e.target.style.borderColor = 'red'}/>
                <input type="password" className="pass one" placeholder="Password" autoComplete="new-password" onFocus={(e) => e.target.style.borderColor = 'red'}/>
                <button className="login" >Log in</button>              
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
            {!toggle && (
              <>
           {/* <VoiceInput
            changeOnEntityType={data.name}
            value={data.name}
            onChange={(e) => handleChange(e, "name")}
    />*/}
               <input type="text" className="name one" placeholder="Name" onFocus={(e) => e.target.style.borderColor = 'red'} />
             {/*  <VoiceInput
            changeOnEntityType={data.email_address}
            value={data.email_address}
            onChange={(e) => handleChange(e, "name")}
  />*/}
                <input type="text" className="name one" placeholder="Username" onFocus={(e) => e.target.style.borderColor = 'red'} />
               {/* <VoiceInput
            changeOnEntityType={data.password}
            value={data.password}
            onChange={(e) => handleChange(e, "name")}
/>*/}
                <input type="text" className="name one" placeholder="Password" onFocus={(e) => e.target.style.borderColor = 'red'}/>
                </>
                
)
            }
{/*{toggle && (
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

)}*/}
                <button className="login">Sign Up</button>
               
       
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