const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    longUrl: {
        type:String,
        required:true
    },
    shortUrl: {
        type:String,
        unique:true
    }
})

const urlShort = mongoose.model('url',urlSchema)

module.exports = urlShort;