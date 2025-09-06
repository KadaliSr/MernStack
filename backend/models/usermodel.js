let mongoose =require('mongoose')
let usch= new mongoose.Schema({
    "_id":"String",
    "name":"String",
    "pwd":"String",
    "otp":"String",
    "role":"String"
})
let um=mongoose.model("user",usch)
module.exports=um
