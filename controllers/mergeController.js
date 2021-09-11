const UrlSchema = require('../models/urlSchema')

const mergeController = async(req,res)=> {
    const data = await UrlSchema.find({})

    res.status(200).json({
        data
    })
}

module.exports = mergeController