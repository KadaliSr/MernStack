const um=require('../models/usermodel')
let bcrypt =require( 'bcryptjs')
let jwt=require('jsonwebtoken')
let adduser=async(req,res)=>{
    try{
       let obj=await um.findById(req.body._id)
       if(obj){
           res.json({"msg":"account already exist"})
        }
       else{
           let pwdhash=await bcrypt.hash(req.body.pwd,10)
           let data=new um({...req.body,"pwd":pwdhash})
           await data.save()
           res.json({"msg":"account created"})
       }
    }
    catch(err){
        res.json({"msg":"plz enter valid details"})
        console.log(err.message)
    }
}
let login=async(req,res)=>{
    try{
        let obj=await um.findById(req.body._id)
        if(obj){
            let f=await bcrypt.compare(req.body.pwd,obj.pwd)
            if (f){
                res.json({"token":jwt.sign(req.body._id,"1234"),"uid":obj._id,"name":obj.name,"role":obj.role})
            }
            else{
                res.json({"msg":"Enter valid password"})
            }
        }
         else{
            res.json({"msg":"Account not found"})
        }

    }
    catch(err){
        res.json({"msg":"plz enter valid details"})
        console.log(err.message)

    }
}
let islogin=async(req,res,next)=>{
    try{
        jwt.verify(req.headers.authorization,"1234")
        next()
    }
    catch(err)
    {
        res.json({"err":"plz login"})
    }
}
let isadmin=async(req,res,next)=>{
    try{
        let obj=await um.findById(req.headers.uid)
        if(obj)
        {
            if(obj.role!="user")
            {
                next()
            }
            else{
                res.json({"err":"your are not amin or retailer"})
            }
        }
        else
        {
            res.json({"err":"your are not user"}) 
        }

    }
    catch(err)
    {
        res.json({"err":"you are not retailer or admin"})
    }
}


module.exports={adduser,login,islogin,isadmin}
