mongoose = require('mongoose')
validator = require('validator')
bcrypt = require('bcryptjs')
jwt = require('jsonwebtoken')
Task = require('./task')

const jwtSecret = process.env.JWT_SECRET

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer        
    }
}, {
    timestamps: true
})

/* userSchema.methods.getPublicProfile = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
} */

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    
    return userObject
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()},jwtSecret)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (! user ) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user

}

// Hash the password before saving
userSchema.pre('save',async function(next) {
    const user = this

    //console.log('just before saving')

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
}) 

// Delete tasks from deleted users
userSchema.pre('remove',async function(next) {
    const user = this

    await Task.deleteMany({ owner: user._id})
    next()
}) 

const User = mongoose.model('User',userSchema)

module.exports = User