
const app = require('./app')

/* Heroku
https://xvr-task-manager.herokuapp.com/ | https://git.heroku.com/xvr-task-manager.git */


const port = process.env.PORT

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