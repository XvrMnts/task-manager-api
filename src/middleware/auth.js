const jwt = require('jsonwebtoken')
const User = require('../models/user')

const jwtSecret = process.env.JWT_SECRET

const auth = async (req,res,next) => {
    // console.log('auth mw')
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,jwtSecret)
/*         console.log(token)
        console.log(decoded)
        console.log({ _id: decoded._id, 'tokens.token': token} )
 */        
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})

        if(!user) {
            throw new Error('i canot find the user')
        }

        req.token = token
        req.user = user
        next()

    } catch (error) {
        res.status(401).send( { error: 'Please authenticate.'+error})
    }
    
}

module.exports = auth

