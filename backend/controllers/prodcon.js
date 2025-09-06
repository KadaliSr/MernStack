let {v4}=require('uuid')
let pm=require('../models/prodmodel')
let multer=require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './prodimgs')
  },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+"."+file.mimetype.split("/")[1])
    }
  })


const upload = multer({ storage: storage })

let addprod=async(req,res)=>{
    try{
        let crtPrice = Number(req.body.price.replace(/,/g, ""))
        let data=new pm({...req.body,"_id":v4(),"pimg":req.file.filename,"price":crtPrice})
        await data.save()
        res.json({"msg":"prod added"})
      }
    catch(err)
    {
       res.json({"err":"error in adding prod"})
       console.log(err.message)
       console.log("BODY:", req.body)
      console.log("FILE:", req.file)

    }
}

let prod=async(req,res)=>{
    try{
        let data=await pm.find()
        res.json(data)
    }
    catch(err)
    {
        res.json({"err":"error in fetching prods"})
    }
}
let getbyid=async(req,res)=>{
    try{
        let data=await pm.findById(req.params.pid)
        let obj=await pm.aggregate([{$unwind:{"path":"$comm"}},{$group:{"_id":"$_id","avgrt":{$avg:"$comm.rt"},"count":{$sum:1}}}])
        if(obj)
        {
            console.log(obj)
            
        }
        else{
            console.log("no rt")
        }
 res.json(data)
    }
    catch(err)
    {
        console.log(err)
    }
}

let addcomm=async(req,res)=>{
    try{
       await pm.findByIdAndUpdate({"_id":req.body.pid},{$push:{"comm":req.body}})
        res.json({"msg":"comm added"})
    }
    catch(err)
    {
        console.log(err)
    }
}
let upd=async(req,res)=>{
    try{
       await pm.findByIdAndUpdate({"_id":req.body._id},req.body)
        res.json({"msg":"prod details updated"})
    }
    catch(err)
    {
        console.log(err)
    }
  }
let getbyretid=async(req,res)=>{
    try{
let data=await pm.find({"rid":req.params.rid})
res.json(data)
    }
    catch(err)
    {
        console.log(err)
    }
}
let delprod=async(req,res)=>{
    try{
        await pm.findByIdAndDelete({"_id":req.params.pid})
               res.json({"msg":"prod del"})
    }
    catch(err)
    {
        console.log(err)
    }
}
let updimg=async(req,res)=>{
    try{
      let obj= await pm.findByIdAndUpdate({"_id":req.body._id},{"pimg":req.file.filename})
       fs.rm(`./prodimgs/${obj.pimg}`,()=>{})
      res.json({"msg":"prod img updated"})

    }
    catch(err)
    {
        console.log(err)
    }
}
let regsearch=async(req,res)=>{
    try{
 const regex = new RegExp(req.params.st, 'i'); // 'i' for case-insensitive
        let obj = await pm.find({ name: { $regex: regex } });
        res.json(obj);
    }
    catch(err)
    {
        console.log(err)
    }
}


module.exports={addprod,prod,upload,getbyid,addcomm,upd,delprod,getbyretid,updimg,regsearch}

