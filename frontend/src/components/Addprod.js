import {useState,useEffect,useRef,useContext} from 'react'
import Cookies from 'js-cookie'
import  {useNavigate } from 'react-router-dom'
import axios from 'axios'
import Ct from "./Ct"
    



const Addprod = () => {
  let [data,setData]=useState({"name":"","desc":"","cat":"","price":"","pimg":""})
  let[msg,setMsg]=useState("")
  let [uid,setUid]=useState("")
  let navigate=useNavigate()
  let fileInputRef = useRef(null)
 let obj=useContext(Ct)

 useEffect(()=>{
      let x=Cookies.get("lc")
      if(x!=undefined)
      {
        x=JSON.parse(x)
        setUid(x.uid)
      }
      else{
        navigate("/login")
      }
    },[])

  let fun=(e)=>{
     setData({...data,[e.target.name]:e.target.value})
    }
  let fun1=(e)=>{
      setData({...data,"pimg":e.target.files[0]})
   }
  let add=(e)=>{
       e.preventDefault()
       let fd= new FormData()
       for( let p in data){
          fd.append(p,data[p])
      }
      fd.append("rid",uid)
      axios.post("https://mernstack-backend-lixd.onrender.com/addprod",fd,{"headers":{"Authorization":obj.state.token,"uid":obj.state.uid}}).then((res)=>{
       if(res.data.err)
      {
        setMsg(res.data.err)
      }
     else{
      setMsg(res.data.msg)
      setData({"name":"","desc":"","cat":"","price":"","pimg":""})
      fileInputRef.current.value = null
     }

      })
  }
  return(<div className='addprodcon'>
            <div className='addprod'>
                 <div>{msg}</div>
                 <input type='text' placeholder='Enter Name' value={data.name} onChange={fun} name="name"className='form'/>
                 <input type='text' placeholder='Enter Description' value={data.desc} onChange={fun} name="desc"className='form'/>
                 <input type='text' placeholder='Enter Category' value={data.cat} onChange={fun} name='cat'className='form'/>
                 <input type='text' placeholder='Enter Price' value={data.price} onChange={fun} name='price'className='form'/>
                 <div><input type='file' onChange={fun1} className='form' ref={fileInputRef}/></div>
                <button  type="submit" onClick={add} className='form'>Add Product</button>
             </div>
          </div>
  )

}

export default Addprod
