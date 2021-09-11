const UrlSchema = require('../models/urlSchema')
const randomstring = require("randomstring");

const PostController = async(req,res) => {

try {
    const data = new UrlSchema({
        longUrl  : req.body.longUrl,
        shortUrl : randomstring.generate(),
   })


   const created = await data.save();

   res.status(200).json(created)
} catch (error) {
    console.log(error)
}
}

module.exports = PostController;