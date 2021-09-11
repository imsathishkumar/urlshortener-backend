const { User } = require('../models/userModel');
const { generateToken } = require('../utils/token')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key:"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"
    }
}))

const authUser = async (req, res) =>
{
    const { email, password } = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
}

const getUserProfile = async (req,res) =>{
   
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    }else {
        res.status(404)
        throw new Error('User not Found')
    }
}

const registerUser = async (req, res) =>
{
    const { name, email, password } = req.body

    const user = await User.findOne({email})

    if(user){
        res.status(400)
        throw new Error("User Already Exists")
    }

    const newUser = await User.create({
        name,
        email,
        password
    })    
    
    if(newUser){
        transporter.sendMail({
            to:newUser.email,
            from:"s.ragul3333@gmail.com",
            subject:"Successfully signed in",
            html:`<h4>Hello ${newUser.name},<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;Welcome to our website.<h4>`

        })
    }else{
        res.status(401)
        throw new Error('Invalid user data')
    }
}


const resetPassword = async (req, res) =>
{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")

        User.findOne({email:req.body.email})
            .then(user=>{
                if(!user){
                    res.status(400)
                    throw new Error("User not Exists")
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result)=> {
                    transporter.sendMail({
                        to:user.email,
                        from:"s.ragul3333@gmail.com",
                        subject:"Reset Password",
                        html:`<h4>Hi ${user.name},<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Click <a href='https://reset-passcode.netlify.app/reset/${token}'>here</a> to reset your password<h4>`
            
                    })
                    res.json({message:"Check you email"})
                })

             
            })
        
        

    })

   

   
    
    
}


const newpassword = async(req,res) => {
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            throw new Error({msg:"Session expired"})
        }
        bcrypt.hash(newPassword,12).then(hash=>{
            user.password = hash;
            user.resetToken = undefined;
            user.expireToken = undefined; 

            user.save().then((saveuser)=>{
                res.json({message:"Update succcess"})
            })
        })
    }).catch(err=>{
        console.log(err.message)
    })
}




module.exports = { authUser,getUserProfile,registerUser,resetPassword,newpassword }