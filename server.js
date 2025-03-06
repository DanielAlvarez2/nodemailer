const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.static('public'))
const PORT = process.env.PORT || 5005
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})
app.listen(PORT,()=>{
    console.log(`Server Running on Port: ${PORT}`)
})