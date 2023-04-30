"use client";

import { login_signUp, flip }  from "../script"   
import "../styles/style(signUp).css"

export default function Home() {
    return (

       <div onLoad={login_signUp()}>
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
                <button className="login">Log in</button>
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
            <form method="post" action="" id="signUp">
            <div className="fields field_one">
                <input type="text" className="name one" placeholder="Username" />
                <input type="text" className="name one" placeholder="Email" />
                <input type="text" className="name one" placeholder="Password" />
                <input
                type="text"
                className="name one"
                placeholder="Confirm Password"
                />
                <button className="login">Sign Up</button>
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