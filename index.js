const express=require('express')
const { default: mongoose } = require('mongoose')
const { MONGOURI } = require('./keys')
const app=express()


mongoose.connect(MONGOURI,(err) =>{
    if(err) console.log(err)
    else console.log("Database Connected")
})

app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


const PORT=3000
app.listen(PORT,(req,res)=> console.log(`server is running at ${PORT}`))