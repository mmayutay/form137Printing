const express = require('express');
const nameSchema = require("../model/nameSchemas")
const app = express();
const fs = require('fs');
const path = require('path')
const administrator = { auth: false }

app.get('/student', async (req, res) => {
    const studentsInfo = await nameSchema.find({})

    try {
        res.send(studentsInfo)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

// C:\Users\Administrator\FirstAngularApp\src\assets\studentsImages

app.post('/studentInfo', async (req, res) => {
    for (let index = 0; index < req.body.images.length; index++) {
        const pathFile = path.join("C:/Users/Administrator/Desktop/UploadImages/" + req.body.images[index])
        const pathNewDestination = path.join('C:/Users/Administrator/FirstAngularApp/src/assets/studentsImages', req.body.images[index])
        fs.copyFile(pathFile, pathNewDestination, (err) => {
            if (err) {
                console.error(err)
            } else {
                console.log("File copied successfully!")
            }
        })

    }
    const studentsData = new nameSchema(req.body)

    try {
        await studentsData.save()
        res.send(true)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

app.post('/delete', async (req, res) => {
    const studentIsDeleted = await nameSchema.deleteOne({ _id: req.body._id })

    try {
        res.send(true)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/studentToEdit/:id', async (req, res) => {
    const studentData = await nameSchema.find({ _id: req.params.id })

    try {
        res.send(studentData)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/addUser', (req, res) => {
    let addNewUser = { images: req.body.images, name: req.body.name, adviser: req.body.adviser, section: req.body.section, schoolYear: req.body.schoolYear }
    console.log()
    const newUser = new nameSchema(addNewUser)

    try {
        newUser.save()
        res.send(true)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post('/login', async (req, res) => {
    const query = await nameSchema.find({ section: req.body.name })
    if (query.length == 0) {
        res.send(false)
    } else {
        if (req.body.password == query[0].schoolYear) {
            administrator.auth = true
            res.send(req.body)
        } else {
            res.send(false)
        }
    }
})

app.post('/verify', (req, res) => {
    if (administrator.auth.toString() == req.body.auth) {
        res.send(true)
    } else {
        if (req.body.auth == 'false') {
            administrator.auth = false
            res.send(false)
        } else {
            res.send(false)
        }
    }
})


module.exports = app

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