const { User } =  require('./models/userModel')
const jwt = require('jsonwebtoken')

const protect = async (req,res,next) => {
let token;

if(
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')
){
    try {
        token = req.headers.authorization.split(' ')[1]

        const decode = jwt.verify(token,process.env.PRIVATE_KEY)

        console.log(decode.id)

        req.user = await User.findById(decode.id).select('-password')  
        console.log(req.user)



          next()  
    } catch (error) {
        console.log(error)
    }
}

if(!token){
    res.status(401).json({
        message:"No Token"
    })
}
}

module.exports = {protect}