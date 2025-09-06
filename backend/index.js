let express=require ('express')
let mongoose=require( 'mongoose')
let rt =require( './routes/route.js')
let bodyParser=require('body-parser')
let cors=require("cors")
require("dotenv").config();
const myObject = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGO_URI,      // match your .env
  SECRET_KEY: process.env.JWT_SECRET  // match your .env
};

const customer = {
  processENV: myObject
};

console.log("Customer object running in code:", customer);
console.log("Port:", customer.processENV.PORT);
console.log("Mongo URL:", customer.processENV.DB_URL);
console.log("Secret Key:", customer.processENV.SECRET_KEY);


mongoose.connect("mongodb://127.0.0.1:27017/project").then=()=>{
    console.log("ok")
}
let app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({"extended":true}))
app.use('/prodimgs', express.static('prodimgs'))
app.use(cors())
app.use("/",rt)

const PORT = customer.processENV.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


