import {useState,useEffect,useContext} from 'react'
import Ct from './Ct'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate}  from 'react-router-dom'

const Cart = () => {
  let [data,setData]=useState([])
  let [ctotal,setCtotal]=useState(0)
  let [f,setF]=useState(true)
  let obj=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
      let x=Cookies.get("lc")
      if(x!=undefined)
        {
           x=JSON.parse(x)
           obj.stateupd(x)
           axios.get(`https://mernstack-backend-lixd.onrender.com/getcart/${obj.state.uid}`).then((res)=>{
            let t= 0
            for(let cobj of res.data){
               t=t+cobj.qty*cobj.price
            }
            setCtotal(t) 
            setData(res.data)
              }).catch((err)=>{
                console.log(err.message)
                })
        }
        else{
          navigate("/login")
        }
  },[f])
  let delcart=(cid)=>{
      axios.get(`https://mernstack-backend-lixd.onrender.com/del/${cid}`).then(()=>{
      setF(!f)
    })

  }
  let incqty=(cid)=>{
      axios.get(`https://mernstack-backend-lixd.onrender.com/inc/${cid}`).then(()=>{
      setF(!f)
      })
    }
  let decqty=(cid,qty)=>{
     if(qty>1){
       axios.get(`https://mernstack-backend-lixd.onrender.com/dec/${cid}`).then(()=>{
       setF(!f)
       })
     }
    else{
      delcart(cid)
    }
  }
  return (
          <div className='cardcon'>{  
            data.map((pobj)=>{
              return(
                      <div className='card'>
                           <img src={pobj.pimg}  alt="prodimg" /> 
                           <h3>{pobj.name}</h3><br></br>
                           <h5>₹{pobj.price.toLocaleString("en-IN")}</h5>
                          <p className='pbutton'><button onClick={()=>decqty(pobj._id,pobj.qty)}>-</button>{pobj.qty}<button onClick={()=>incqty(pobj._id)}>+</button></p>
                          <p>Total:₹{(pobj.qty * pobj.price).toLocaleString("en-IN")}</p><br></br>
                          <button onClick={()=>delcart(pobj._id)}>Remove Cart</button>
                     </div> 
                 )
              })
           }
         { data.length>0&&  <div className='cardtotal'>Total:₹{ctotal.toLocaleString("en-IN")}</div>} 
        { data.length==0&&  <div className='card'>Your Cart was empty</div>} 

          </div>
        )
}

export default Cart

