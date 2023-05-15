import Navbar from '../components/navbar'

export default function Home() {

    let theme = '';


    if(localStorage.getItem("theme") == "light"){
        theme = "light";
    }
   else{
    theme = "dark";
   }

    return (      
        <>
         <div className={`container-addNew ${theme}`}>
        <Navbar/>

        <h2 className="todayH2">Edit Profile</h2>
        <div className='edit-profile-inputs'>
           
           <h2 className="editCat setTop">Full Name</h2>
           <input className='setTop-input'/>
           <h2 className="editCat setTop">Username</h2>
           <input className='setTop-input'/>
           <h2 className="editCat setTop">Password</h2>
           <input className='setTop-input'/>
            </div>
            <button className="btn addBtn setbtn">Edit</button>
        </div>
        </>
    )
}