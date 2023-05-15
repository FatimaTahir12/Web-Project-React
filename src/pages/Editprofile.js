import Navbar from '../components/navbar'

const initialValue = {
    name: '',
    password: '',
}



export default function Home() {


    const [user, setUser] = useState(initialValue);
    const { name, password } = user;
    
    const editProfile = async() => {
        const response = await editUser(id, user);
        navigate('/all');
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

    return (      
        <>
         <div className="container-addNew">
        <Navbar/>

        <h2 className="todayH2">Edit Profile</h2>
        <div className='edit-profile-inputs'>
           
           <h2 className="editCat setTop">Full Name</h2>
           <input className='setTop-input' onChange={(e) => onValueChange(e)} name='name' value={name}/>
           <h2 className="editCat setTop">Password</h2>
           <input className='setTop-input' onChange={(e) => onValueChange(e)} name='password' value={password}/>
            </div>
            <button className="btn addBtn setbtn" onClick={() => editProfile()}>Edit</button>
        </div>
        </>
    )
}