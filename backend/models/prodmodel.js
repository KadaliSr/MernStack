let mongoose=require('mongoose')
let psch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "desc":String,
    "cat":String,
    "price":Number,
    "pimg":String,
    "rid":String,
    "comm":[],
  "public_id": String,
})
let pm=mongoose.model("prod",psch)
module.exports=pm