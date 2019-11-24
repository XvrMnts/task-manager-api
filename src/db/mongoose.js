mongoose = require('mongoose')
validator = require('validator')

const connectionUrl = process.env.MONGODB_URL


/* mongoose.connect(connectionUrl+'/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
 */

mongoose.connect(connectionUrl,{
    dbName: "task-manager-api",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: false

const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password contains word password')
            }
        }
    },
    age: {
        type: Number,
        defauld: 0,
        validate(value) {
            if (value <0) {
                throw new Error('Age miust be positive')
            }
        }
    }

})


const Task = mongoose.model('Task',{
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }

})


const me = new User({
    name: 'MABEL M ',
    email: "  MAB@RTG.net  ",
    password: "psassword_"
})

me.save().then(() => {
    console.log(me)
}).catch((error)=>{
    console.log('Error: ', error)
})


const task = new Task({
    description: "do it!",
    completed: false
})

task.save().then(() => {
    console.log(task)
}).catch((error)=>{
    console.log('Error: ', error)
})

