import  { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'
import {useNavigate} from 'react-router-dom'
const Home = () => {
    let [prod,setProd]=useState([])
    let obj=useContext(Ct)
    let navigate=useNavigate()
    let [f,setF]=useState(false)
    useEffect(()=>{
        axios.get("http://localhost:5000/prod").then((res)=>{
            setProd(res.data)
        })
    },[])
let addcart=(pobj)=>{
      if(obj.state.token===""){
        navigate("/login")
      }
      else{
        axios.post("http://localhost:5000/addcart",{
          "uid":obj.state.uid,
          "pid":pobj._id,
          "name":pobj.name,
          "price":pobj.price,
          "pimg":pobj.pimg,
          "qty":1}).then((res)=>{
            setF(true)
          setTimeout(() => {
             setF(false)
           },1000)
        })
      }
    }
 return (
      <div className='con'>
          {f&& <div className='alert'><p>Product Added to Cart</p>
      {/* <button onClick={()=>setF(false)}>X</button> */}
           </div>}
        <div className='cardcon'>{  
          prod.map((pobj)=>{
            return(
                    <div className='card'>
                           <img src={`http://localhost:5000/prodimgs/${pobj.pimg}`}  alt="prodimg" /> 
                           <h3>{pobj.name}</h3><br></br>
                           <h5>₹{pobj.price.toLocaleString("en-IN")}</h5><br></br>
                           <p>{pobj.desc}</p><br></br>
                           {obj.state.role !="Retailer" &&
                             <button  onClick={()=>addcart(pobj)}>Addtocart</button>  
                           }<br></br>
                          {obj.state.token !== "" &&
                           <button onClick={()=>navigate(`/Cm/${pobj._id}`)}>Know More</button>
                          }

                    </div> 
                )
              })
          }
        </div>
     </div>
  )
}

export default Home                                                  
