import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Updpwd = () => {
  let [data,setData]=useState({"pwd":"","otp":""})
  let {uid}=useParams()
  let navigate=useNavigate()
  let fun=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let resetpwd=()=>{
    axios.post("http://localhost:5000/resetpwd",{...data,"uid":uid}).then(()=>{
      navigate("/login")
    }).catch((err)=>{

    })
  }
  return (
    <div className='logincon'>
      <div className='login'>
        <input type='text' name="pwd" onChange={fun} className='form' placeholder='Enter New password'/>
        <input type='text' name="otp" onChange={fun} className='form' placeholder='Enter OTP'/>
        <button onClick={resetpwd} className='form'>Reset</button>
     </div>
     </div>
  )
}

export default Updpwd