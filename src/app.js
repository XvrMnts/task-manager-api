const express = require('express')
require('./db/mongoose.init')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

/* Heroku
https://xvr-task-manager.herokuapp.com/ | https://git.heroku.com/xvr-task-manager.git */

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


module.exports = app