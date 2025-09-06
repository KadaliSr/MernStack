let cm = require("../models/cartmodel")
let {v4}=require("uuid")

let addcart=async(req,res)=>{
    try{
        let obj=await cm.find({"uid":req.body.uid,"pid":req.body.pid})
        if(obj.length==0)
        {      
         let crtPrice = Number(String(req.body.price).replace(/,/g, ""))
          let data=new cm({...req.body,"_id":v4(),"price":crtPrice})
            await data.save()
            res.json({"msg":"prod added"})
        }
        else{
            await cm.findByIdAndUpdate({"_id":obj[0]._id},{$inc:{"qty":1}})
               res.json({"msg":"prod qty inc"})
        }

    }
    catch(err)
    {
        console.log(err)
    }
}
let getcart=async(req,res)=>{
    try{
        let data=await cm.find({"uid":req.params.uid})
        res.json(data)

    }
    catch(err)
    {
        console.log(err.message)
    }
}

let incqty=async(req,res)=>{
    try{
        await cm.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"qty":1}})
               res.json({"msg":"prod qty inc"})
    }
    catch(err)
    {
        console.log(err)
    }
}

let decqty=async(req,res)=>{
    try{
        await cm.findByIdAndUpdate({"_id":req.params.cid},{$inc:{"qty":-1}})
               res.json({"msg":"prod qty inc"})
    }
    catch(err)
    {
        console.log(err)
    }
}
let delcart=async(req,res)=>{
    try{
        await cm.findByIdAndDelete({"_id":req.params.cid})
               res.json({"msg":"cart prod del"})
    }
    catch(err)
    {
        console.log(err)
    }
}

module.exports={addcart,getcart,incqty,decqty,delcart}