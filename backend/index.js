let express = require('express');
let mongoose = require('mongoose');
let rt = require('./routes/route.js');
let cors = require("cors");
require("dotenv").config();

const myObject = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/project",
  SECRET_KEY: process.env.JWT_SECRET || "defaultSecret"
};

const customer = { processENV: myObject };

console.log("Customer object running in code:", customer);


mongoose.connect(myObject.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error(" DB Connection Error:", err));

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/", rt);

app.listen(myObject.PORT, () => {
  console.log(`Server running on port ${myObject.PORT}`)

});



