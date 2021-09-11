const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        resetToken:String,
        expireToken:Date,
    }, {
    timestamps: true
}
)

userSchema.methods.matchPassword = async function (enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.hashPassword = async function (enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password)
}



const User = mongoose.model('user', userSchema)

module.exports = { User }