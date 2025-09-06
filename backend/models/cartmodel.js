let mongoose= require("mongoose");

let csch=new mongoose.Schema({
    "_id":String,
    "name":String,
    "price":Number,
    "pimg":String,
    "uid":String,
    "pid":String,
    "qty":Number
   

})
let cm=mongoose.model("cart",csch)
module.exports=cm