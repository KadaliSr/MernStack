import {  useContext,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import Ct from './Ct'

const Logout = () => {
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    Cookies.remove("lc")
    obj.stateupd({"token":"","uid":"","role":"","name":""})
    navigate("/")
  },[])
  return (
    <div>
      Logout
    </div>
  )
}

export default Logout
