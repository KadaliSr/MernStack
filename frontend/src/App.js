import Nav from './components/Nav'
import Home from './components/Home'
import Reg from './components/Reg'
import Login from './components/Login'
import Cart from './components/Cart'
import  Logout from './components/Logout' 
import Addprod from './components/Addprod'
import Resetpwd from './components/Resetpwd'
import Updpwd from './components/Updpwd'
import  Cm from './components/Cm'
import  Admpage from './components/Admpage'
import Edit from './components/Edit'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {useState,useEffect} from 'react'
import Ct from './components/Ct'
import Cookies from 'js-cookie'
import './App.css'
 
const App = () => {
  let [state,setState] =useState({"token":"","uid":"","name":"","role":""})
  let stateupd=(sobj)=>{
      setState({...state,...sobj})
  }
  useEffect(()=>{
    let x=Cookies.get("lc")
    if (x!=undefined){
      stateupd(JSON.parse(x))
    }
  },[])
  let obj={"state":state,"stateupd":stateupd}

  return(
       <BrowserRouter>
             <Ct.Provider  value={obj}>
               <Nav/>
               <Routes>
                   <Route path="/" element={<Home/>}/>
                   <Route path="/reg" element={<Reg/>}/>
                   <Route path="/login" element={<Login/>}/>
                   <Route path="/cart" element={<Cart/>}/>
                   <Route path="/addprod" element={<Addprod/>}/>
                    <Route path="/resetpwd" element={<Resetpwd/>}/>
                    <Route path="/updpwd/:uid" element={<Updpwd/>}/> 
                   <Route path="/logout" element={<Logout/>}/>
                   <Route path="/Cm/:pid" element={<Cm/>}/>
                  <Route path="/adm" element={<Admpage/>}/>
                  <Route path="/edit" element={<Edit/>}/>

               </Routes>
            </Ct.Provider>
       </BrowserRouter>
  )
}

export default App
