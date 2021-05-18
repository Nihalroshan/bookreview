const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    coverUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
    },
    genre:{
        type:String,
        required:true
    },
    getBook:{
        type:String
    }
})

module.exports = mongoose.model('Book',bookSchema);