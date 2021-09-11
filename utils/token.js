const jwt = require('jsonwebtoken')

const generateToken =  (id) => {
    return  jwt.sign({id},process.env.PRIVATE_KEY,{
        expiresIn:"1h"
    })
}

module.exports = {generateToken}