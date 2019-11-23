// CRUD ops

/* const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
 */

 const { MongoClient , ObjectID } = require('mongodb')

const connectionURL =  'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

/* const id = new ObjectID()

console.log(id)
console.log(id.getTimestamp())
 */

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true}, (error,client) => {
    if(error) {
        return console.log('Unable to connect')
    }

    console.log('Connected Correctly!')

    const db = client.db(databaseName)
    
/*     const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID('5db5edb52d349e4d78c07e35')
    }, {
        $set: {
            name: "Mike"
        }
    })

    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
 */

 /* 
    updatePromise = db.collection('users').updateOne({
        _id: new ObjectID('5db5edb52d349e4d78c07e35')
    }, {
        // $set: {
        //    name: "Mike"
        // }
        $inc: {
            age: 2
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})
