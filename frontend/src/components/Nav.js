import {useContext} from 'react'
import {Link} from 'react-router-dom'
import Ct from './Ct'
const Nav = () => {
  let obj=useContext(Ct)
  return (
        <nav className='nav'>
            <Link to="/">Home</Link>
            {obj.state.token=="" && <Link to="/reg">Register</Link>}
            {obj.state.token=="" && <Link to="/login">Login</Link>}
            {obj.state.token!="" && obj.state.role=="Retailer"&&<Link to="/addprod">Addprod</Link>}
            {obj.state.token!=""&& obj.state.role=="Retailer" && <Link to="/adm">ProdsAddedByMe</Link>}
            {obj.state.token!="" && obj.state.role === "User" && <Link to="/cart">Cart</Link>}
            {obj.state.token!="" && <Link to="/logout">Logout</Link> }
            {obj.state.token!="" && <h4>{obj.state.name}</h4>}
         </nav>
  )
}

export default Nav

