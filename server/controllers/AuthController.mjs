import User from "../models/UserModel.mjs"
import secreToken from "../utils/SecretToken.mjs"
import bcrypt from 'bcrypt' 

const SignUp = async (req, res) => {
    try{
        const {email, password, username, createdAt} = req.body
        const existingUser = await User.findOne({email, password})
        if(existingUser)
            return res.json({message: 'User already exists'})

        const user = await User.create({email, password, username, createdAt})
        const token = secreToken(user._id)
        res.cookie("token", token , {
            httpOnly : false,
            withCredentials: true
        })

        res.status(200).json({message: 'User created successfully', sucess : true, user})

    }catch(err){
        console.log(err)
    }
}

const SignIn = async(req, res, next) => {

    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        
        if(!user)
            return res.json({message : 'Username or Password not found'})
        
        const auth = await bcrypt.compare(password, user.password)
        
        if(!auth)
            return res.json({message : 'Username or Password not found'})

        const token = secreToken(user._id)
        res.cookie("token", token, {
            httpOnly: false,
            withCredentials : true
        })
    
        res.status(200).json({message : 'User logged in successfully', success : true})
        next()

    }catch(error){
        console.log(error)
    }
}
export {SignIn, SignUp}