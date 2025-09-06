import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import Ct from './Ct';
import StarIcon from '@mui/icons-material/Star';

const Cm = () => {
    let {pid}=useParams()
    let [prod,setProd]=useState("")
     const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(-1);
  let [f,setF]=useState(true)
  let ipt=useRef()
    let obj=useContext(Ct)
    useEffect(()=>{
        axios.get(`http://localhost:5000/getbyid/${pid}`).then((res)=>{
            setProd(res.data)
        }).catch((err)=>{
            setProd(err)
        })
    },[f,pid])
    let add=()=>{
        axios.put("http://localhost:5000/addcomm",{"pid":pid,"name":obj.state.name,"text":ipt.current.value,"rt":value}).then((res)=>{
setF(!f)
        })
    }
  return (<>
   {prod !="" &&<div className='card'>
         <img src={`http://localhost:5000/prodimgs/${prod.pimg}`}  alt="prodimg" />
        <p>Name:{prod.name}</p>
        <p>Desc:{prod.desc}</p>
        <p>Price:{prod.price}</p>
        <p>Cat:{prod.cat}</p>
        {prod.comm.length>0&&<div>
            <h1>Comments:</h1>
            {prod.comm.map((cm)=>{
                return(<div>
                    <p>{cm.name}:{cm.text}</p>
                    <Rating name="half-rating-read" defaultValue={cm.rt} precision={0.5} readOnly   sx={{
    "& .MuiRating-iconFilled": {
      color: "white",   // filled stars
    }
  }}
 />
                    
                </div>)
            })}
            </div>
            }
{obj.state.token!=""&&<div>
 <h1>Add Comments</h1>
 <input type='text' placeholder='enter com  text' ref={ipt} className='form' />
  <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
          sx={{
             "& .MuiRating-iconFilled": {
               color: "white"
          }
      }}


        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover)
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" color='white' />}
      /><br></br>
      <button onClick={add} >Addcomm</button>
 </div>}
    </div>
    }

   
 </> )
}

export default Cm
