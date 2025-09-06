import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

const Edit = () => {
     let [data,setData]=useState({"name":"","desc":"","cat":"","price":""})
    let navigate=useNavigate()
    let [msg,setMsg]=useState("")
    let [file,setFile]=useState("")
    let fun=(e)=>{
       setData({...data,[e.target.name]:e.target.value})
    }
    useEffect(()=>{
        let x=Cookies.get("prod")
        if(x==undefined)
        {
            navigate("/")
        }
        else{
            setData({...JSON.parse(x)})
        }

    },[])
    let upd=()=>{
        axios.put("http://localhost:5000/upd",data).then((res)=>{
            setMsg(res.data.msg)

        })
    }
      let fun1=(e)=>{
      setFile(e.target.files[0])
    }
    let updimg=()=>{
      let fd=new FormData()
      fd.append("_id",data._id)
      fd.append("pimg",file)
      axios.post("http://localhost:5000/updimg",fd).then((res)=>{
        setMsg(res.data.msg)

      })
    }

  return (
    <div className='addprodcon'>
      <div className='addprod'>
        <div className='err'>{msg}</div>
        <input type='text' placeholder='enter name' value={data.name} onChange={fun} name="name"className='form'/>
        <input type='text' placeholder='enter description' value={data.desc} onChange={fun} name="desc" className='form'/>
        <input type='text' placeholder='enter category' value={data.cat} onChange={fun} name='cat' className='form'/>
        <input type='text' placeholder='enter price' value={data.price} onChange={fun} name='price' className='form'/>
        <button onClick={upd} className='form'>Update</button>
        <div>
          <input type='file' onChange={fun1} className='form'/>
          <button onClick={updimg} className='form'>Update Img</button>
        </div>
     </div>
  </div>
  )
}

export default Edit