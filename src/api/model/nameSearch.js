const mongoose = require('mongoose');

const searchName = new mongoose.Schema({
    studentsData: {
        type: String,
        required: true,
        trim: true 
    }
})

const search = mongoose.model("search", searchName)
module.exports = search