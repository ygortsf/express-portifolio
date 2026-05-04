require('dotenv').config();
const express = require('express')
app = express()
cors = require('cors')


app.listen(3000,(req, rep)=>{
    console.log('rodando', process.env.DATABASE);
})