require('../src/db/mongoose.init')
const Task =  require('../src/models/task')


/* Task.findByIdAndDelete('5dbd601e7fa45c411824740f').then((task) => {
    if (! task) {
        console.log("task not found")
    } else {
        console.log(task+" deleted")
    }
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
 */

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = Task.countDocuments()
    return count
}

deleteTaskAndCount('5dbd5ff4e22efc0ad091d12f').then((count) => {
    console.log("coount: "+count)
} ).catch((e) => {
    console.log("excepció: "+e)
})