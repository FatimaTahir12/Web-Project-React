import logo from './logo.svg';
import Navbar from './components/navbar'
import Dashboard from './pages/Dashboard'
import AddNew from './pages/AddNew'
import Monthly from './pages/Monthly'
import Login from './pages/Login'
import EditProfile from './pages/Editprofile';
import {Routes, Route, Outlet} from "react-router-dom";
import {FormProvider, useForm} from "react-hook-form";
function App() {

  const methods = useForm();

  const Layout = () => {
    return(
      <>
      <Outlet/>
      <></>
      </>
    )
  }

  return (
    
   <FormProvider{...methods}>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/addnew" element={<AddNew/>}/>
        <Route path="/monthly" element={<Monthly/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/editprofile" element={<EditProfile/>}/>
      </Route>
    </Routes>
    </FormProvider>
  );
}

export default App;
