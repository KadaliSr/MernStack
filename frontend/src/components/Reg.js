import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useState} from 'react'
const Reg = () => {
  let [data,setData]=useState({"_id":"","name":"","pwd":"","role":""})
  let [msg,setMsg]=useState("")
  let [showPassword, setShowPassword] = useState(false)
  let navigate= useNavigate()
  let fun=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
  }
  let reg=(e)=>{
      e.preventDefault()
      axios.post("https://mernstack-backend-lixd.onrender.com/reg",data).then((res)=>{
        setMsg(res.data.msg)
        setData({"_id":"","name":"","pwd":"","role":""})
         navigate("/login")
      })
  }
  return (
    <div className="regcon">
        <div className="reg">
           <div>{msg}</div>
           <input type="text" placeholder="Enter Email" onChange={fun} name="_id" value={data._id} className='form'/>
           <input type="text" placeholder="Enter Name" onChange={fun} name="name" value={data.name} className='form'/>
           <input type={showPassword ? 'text' : 'password'} placeholder="Enter Password" onChange={fun} name="pwd" value={data.pwd} className='form ' />
           <label><input type="checkbox"  onChange={() => setShowPassword(!showPassword)} />Show Password</label>
           <div className='radio' style={{ display:'flex', gap:'5px'}}>
               <input type="radio" name="role"onChange={fun} value="User" checked={data.role=="User"}/>User
               <input type="radio" name="role"onChange={fun} value="Retailer" checked={data.role=="Retailer"}/>Retailer
            </div>
           <button type="submit" onClick={reg} className='form'>Register</button>   
       </div>
    </div>
  )
}


export default Reg
