import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const secreToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY,{
        expiresIn: 3 * 24 * 60 * 60
    })
}
export default secreToken