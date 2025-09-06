let express=require ('express')
let mongoose=require( 'mongoose')
let rt =require( './routes/route.js')
let bodyParser=require('body-parser')
let cors=require("cors")
mongoose.connect("mongodb://127.0.0.1:27017/project").then=()=>{
    console.log("ok")
}
let app=express()
app.use(express.json())
app.use(bodyParser.urlencoded({"extended":true}))
app.use('/prodimgs', express.static('prodimgs'))
app.use(cors())
app.use("/",rt)

app.listen(5000)

