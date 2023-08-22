const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const User = require('./models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 8080

mongoose.connect("mongodb://localhost/login")

app.use(cors())
app.use(express.json())

app.post('/api/register', async (req, res)=>{
    console.log(req.body)
    const newPassword = await bcrypt.hash(req.body.password, 10);
    try{
        const user =await User.create({
            name : req.body.name, 
            email : req.body.email, 
            password : newPassword
        })
        console.log(user);
        res.json({status:'ok'})
    }
    catch(err){
        res.json({status: 'error', error: 'Duplicate email'})
    }
})

app.post('/api/login', async (req, res)=>{
    console.log(req.body)
    const user =await User.findOne({
        email : req.body.email, 
    })
    if(!user){
        return res.json({status: 'error', error: 'email Invalid'});
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if(isPasswordValid){
        const token = jwt.sign({
            name: req.body.name, 
            email: req.body.email
        }, 'MySecretKey')
        res.json({status:'ok', message: 'user-found', user: token})
    }
    else{
        res.json({status: "error", error: "Incorrect Password"})
    }
})

app.get('/api/dashboard', async (req, res)=>{
    const token = req.headers['x-access-token'];
    try{
        const decode = jwt.verify(token, 'MySecretKey')
        const user = await User.findOne({
            email: decode.email
        })
        return res.json({status: 'ok', quote: user.quote});

    }
    catch{
        return res.json({status: 'error', error: 'token invalid'})
    }
    console.log(jwt.decode(req.headers['x-access-token']))
})

app.post('/api/dashboard', async (req, res)=>{
    const token = req.headers['x-access-token'];
    // try{
        const decode = jwt.verify(token, 'MySecretKey')
        const response = await User.updateOne({
            email: decode.email
        }, {
            $set: {
                quote: req.body.quote.Quote
            }
        })
        console.log(response)
        return res.json({status: 'ok'});

    // }
    // catch{
    //     return res.json({status: 'error', error: 'token invalid'})
    // }
})

app.get('/', (req, res)=>{
    res.send("Hello World!");
})

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})
