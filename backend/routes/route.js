let express =require('express')
let {adduser,login,isadmin,islogin} =require( '../controllers/usercon.js')
let {sendotp,resetpwd}=require('../controllers/restpwdcon.js')
let {addprod,prod,upload,getbyid,addcomm,getbyretid,delprod,upd,updimg,regsearch}=require('../controllers/prodcon.js')
let {addcart ,getcart,incqty,decqty,delcart}=require('../controllers/cartcon.js')
let rt=express.Router()
rt.post("/reg",adduser)
rt.post("/login",login)
rt.get("/sendotp/:uid",sendotp)
rt.post("/resetpwd",resetpwd)
rt.post("/addprod",upload.single('pimg'),addprod,islogin,isadmin)
rt.get("/prod",prod)

rt.post("/addcart",addcart)
rt.get("/getcart/:uid",getcart)
rt.get("/inc/:cid",incqty)
rt.get("/dec/:cid",decqty)
rt.get("/del/:cid",delcart)

rt.get("/getbyid/:pid",getbyid)
rt.put("/addcomm",addcomm)
rt.get("/getbyrt/:rid",getbyretid)
rt.delete("/del/:pid",delprod)
rt.put("/upd",upd)

rt.post("/updimg",upload.single("pimg"),updimg)
rt.get("/regsearch/:st",regsearch)





module.exports=rt