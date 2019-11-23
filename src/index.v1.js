const express = require('express')
require('./db/mongoose.init')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


/* const router = new express.Router()
router.get('/test', (req,res) => {
    res.send('new router')
})
app.use(router) */

app.use(userRouter)

app.post('/users',async (req,res) => {
    /* console.log(req.body)
    res.send("testing") */
    const user = new User(req.body)

    //Using async/await
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    //

    //Using promises
    /* user.save().then(() => {
        res.status(201)
        res.send(user)
    }).catch((e) => {
        res.status(400)
        res.send(e)
    }) */
})

app.get('/users',async (req,res) => {

    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }

    /* User.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((e) => {
        res.status(500).send()
    }) */
})

app.get('/users/:id', async (req,res) => {
    _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.send(user)    
    } catch (error) {
        res.status(500).send(error)    
    }

    /* User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)    
    }).catch((e) => {
        res.status(500).send()
    }) */
})

app.patch('/users/:id', async (req,res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]

    const isAllowedUpdate = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isAllowedUpdate) {
        return res.status(400).send({ error: "Update not allowed"})
    }
     

    try {
        const _id = req.params.id
        const patchUser = req.body
        const user = await User.findByIdAndUpdate(_id, patchUser, {new: true, runValidators: true})
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.status(200).send(user)    
    
    } catch (error) {
        res.status(400).send(error)    
    }

})

app.delete('/users/:id', async (req,res) => {
    _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.send(user)    
    } catch (error) {
        res.status(500).send(error)    
    }
})

app.post('/tasks',async (req,res) => {
    /* console.log(req.body)
    res.send("testing") */

    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

    /* task.save().then(() => {
        res.status(201)
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    }) */
})

app.get('/tasks',async (req,res) => {

    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }

    /* Task.find({}).then((tasks) => {
        res.status(200).send(tasks)
    }).catch((e) => {
        res.status(500).send()
    }) */
})

app.get('/tasks/:id',async (req,res) => {
        _id = req.params.id

        try {
            task = await Task.findById(_id)    
            if (!task) {
                return res.status(404).send("Task not found")
            }
            res.send(task)
        } catch (error) {
            res.status(500).send(error)    
        }


        /* Task.findById(_id).then((task) => {
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
            
    }).catch((e) => {
        res.status(500).send()
    }) */
})


app.patch('/tasks/:id', async (req,res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description","completed"]

    const isAllowedUpdate = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isAllowedUpdate) {
        return res.status(400).send({ error: "Update not allowed"})
    }
     

    try {
        const _id = req.params.id
        const patchTask = req.body
        const task = await Task.findByIdAndUpdate(_id, patchTask, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send("Task not found")
        }
        res.status(200).send(task)    
    
    } catch (error) {
        res.status(400).send(error)    
    }

})


app.delete('/tasks/:id',async (req,res) => {
    _id = req.params.id

    try {
        task = await Task.findByIdAndDelete(_id)    
        if (!task) {
            return res.status(404).send("Task not found")
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)    
    }
})


app.listen(port,() => {
    console.log('Server is up on port ',port)
})