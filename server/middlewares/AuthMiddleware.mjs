import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const VerifyToken = (req, res, next) => {

    const token = req.cookies.token

    if(!token)
        return res.json({message: 'No token found'})

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err)
            return res.json({message: 'Invalid token'})

        req.user = user
        next()
    })
}

export default VerifyToken