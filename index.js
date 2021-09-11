const express = require('express');
const cors = require('cors')
const { routers } = require('./routes/userRoute')
const router = require('./routes/urlroute');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


const app = express()
dotenv.config();
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send('Welcome')
})

app.use('/apis',routers)
app.use('/api',router)

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=> app.listen(PORT,()=> console.log(`Server is running on ${PORT}`)))
    .catch((err)=>console.log(err))

mongoose.set("useFindAndModify", false);    