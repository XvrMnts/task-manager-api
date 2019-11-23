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
 
/*     db.collection('users').deleteMany({
        age: 51
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    }) */

     db.collection('tasks').deleteOne({
        description: "Nodejs course"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })


})
