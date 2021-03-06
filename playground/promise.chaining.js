require('../src/db/mongoose.init')
const User = require('../src/models/user')

// with chained promises
/* User.findByIdAndUpdate('5dbdfd266f55054df41983b3', {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})
 */

 // with async/await
const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5dbdfd266f55054df41983b3',2).then((count) => {
    console.log ("total: "+count)
}).catch((e) => {
    console.log(e)
})