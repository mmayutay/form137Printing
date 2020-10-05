//"mongodb+srv://raymondjay:iamlegendary11@cluster0.h2o1d.mongodb.net/dbCollection?retryWrites=true&w=majority";
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const showStudent = require('./express/showStudents.js');
// const uri = "mongodb+srv://raymondjay:iamlegendary11@cluster0.h2o1d.mongodb.net/dbCollection?retryWrites=true&w=majority";
const uri = "mongodb://127.0.0.1:27017/dbCollection?retryWrites=true&w=majority";
const administrator = {name: "administrator", password: "administrator", auth: false}


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//Routes to use
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB!")
}).catch(err => {
    console.log(err)
})

app.use(showStudent)

// app.post('/login', (req, res) => {
//     if (req.body.name == administrator.name && req.body.password == administrator.password) {
//         administrator.auth = req.body.auth
//         if(req.body.auth) {
//             res.send(req.body)
//         }else {
//             res.sendStatus(401)
//         }
//     }else {
//         res.send(false)
//     }
// })

app.post('/verify', (req, res) => {
    if(administrator.auth.toString() == req.body.auth) {
        res.send(true)
    }else {
        if(req.body.auth == 'false') {
            administrator.auth = false
            res.send(false)
        }else {
            res.send(false)
        }
    }
})


app.listen(3000, () => {console.log('Listening to port 3000')})
