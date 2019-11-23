const express = require('express')
require('./db/mongoose.init')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

/* app.use((req,res,next) => {
    /* console.log(req.method,req.path)
    next() */
/*
    if (req.method === 'GET') {
        res.send("Get requests are disabled")
    } else {
        next()
    }
}) */

/* app.use((req,res,next) => {
    res.status(503).send("Mainteneace mode")
})
 */


app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port,() => {
    console.log('Server is up on port ',port)
})

const bcrypt = require('bcryptjs')

const myFunction = async (password)  => {
    const hashedPassword = await bcrypt.hash(password,8)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare(password,hashedPassword)
    console.log(isMatch)
}

myFunction('qwerty')

const jwt = require('jsonwebtoken')

const myFunctionJWT = async () => {
    const token = jwt.sign({ _id: 'abc123'},'charstosign',{expiresIn: '2 weeks'})
    console.log("token: "+token)

    const data = jwt.verify(token,'charstosign')
    console.log("verify ",data)
}


const pet = {
    name: 'Hal'
}

pet.toJSON = function() {
    return this
}

console.log(JSON.stringify(pet))