import {useState,useContext} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import {Link} from 'react-router-dom'


const Login = () => {
   let [data,setData]=useState({"_id":"","pwd":""})
   let navigate=useNavigate()
   let [msg,setMsg]=useState("")
  let [showPassword, setShowPassword] = useState(false)
   
   let obj=useContext(Ct)

   let fun=(e)=>{
     setData({...data,[e.target.name]:e.target.value})
   }
   let login=(e)=>{
      e.preventDefault()
      axios.post("http://localhost:5000/login",data).then((res)=>{
      if(res.data.token != undefined){
         Cookies.set("lc",JSON.stringify(res.data))
         obj.stateupd(res.data)
         navigate("/")
      }
      else if(res.data.msg !="Account not found"){
        setMsg(res.data.msg)
      }
      else{
        setMsg(res.data.msg)
        setTimeout(() => {
            navigate("/reg")
          },500)

      }  
    })
   }
    return (
        <div className="logincon">
           <div className="login">
                  <div>{msg}</div>
                  <input type="text" placeholder='Enter Email' onChange={fun} name="_id" className='form'/>
                  <input type={showPassword?'text':'password'} placeholder='Enter password' onChange={fun} name="pwd" className='form'/>
                 <label><input type="checkbox"  onChange={() => setShowPassword(!showPassword)} />Show Password</label>
                  <button type="submit" onClick={login}className='form'>Login</button>
                  <Link to="/resetpwd" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
  Forgot password</Link>

            </div>
       </div>
  )
}

export default Login

