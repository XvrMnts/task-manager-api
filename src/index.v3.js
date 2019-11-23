const express = require('express')
require('./db/mongoose.init')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        filesize: 1000000
    },
    fileFilter(req, file, cb) {
        //if (!file.originalname.endsWith('.pdf')) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'))
        } 
        cb (undefined, true)    
    } 
})

/*const errorMiddleware = (req,res,next) => {
    throw new Error('From my middleware')
} 

app.post('/upload', errorMiddleware, upload.single('upload'), (req,res) => {
    res.send()
}) */

app.post('/upload', upload.single('upload'), (req,res) => {
    res.send()
}, (error,req,res,next) => {
    res.status(400).send({error: error.message})
})

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


/* const main = async() => {
    const task = await Task.findById('5dc73b40bede920b9c611229')
    await task.populate('owner').execPopulate()
    console.log(task.owner)

    const user =  await User.findById('5dc7398e5b37a31c389d7dbe')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)

}

main() */