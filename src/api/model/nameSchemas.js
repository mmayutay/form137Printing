const mongoose = require('mongoose');

const nameSchemas = new mongoose.Schema({
    schoolYear: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true   
    },
    adviser: {
        type: String,
        trim: true
    },
    section: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: Array,
        required: true,
        trim: true
    }
})

const studentsName = mongoose.model("studentsName", nameSchemas)
module.exports = studentsName