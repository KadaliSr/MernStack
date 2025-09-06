import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Resetpwd = () => {
  let [uid,setUid]=useState("")
  let [msg,setMsg]=useState("")
  let navigate=useNavigate()
  let fun=(e)=>{
    setUid(e.target.value)
  }
  let sendotp=()=>{
    axios.get(`http://localhost:5000/sendotp/${uid}`).then((res)=>{
      if(res.data.msg ==="otp sent")
      {
        navigate(`/updpwd/${uid}`)

      }
      else{
        setMsg(res.data.msg)
      }

    })
  }
  return (
    <div className='logincon'>
      <div className='login'>
      <div>{msg}</div>
      <input type='text' placeholder='Enter UserId'onChange={fun} className='form'/>
      <button onClick={sendotp} className='form'>Send OTP</button>
     </div>
    </div>
  )
}

export default Resetpwd