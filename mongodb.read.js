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
    db.collection('users').findOne({ name: 'Xavier', age: 47},(error,user) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(user)
    })

    db.collection('users').findOne({ _id: new ObjectID('5db7579b3f76ee41dced8d18')},(error,user) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(user)
    })

// returns a cursos, convert to array to get all documents
    db.collection('users').find({ age: 47}).toArray((error,users) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(users)
    })

    db.collection('users').find({ age: 47}).count((error,count) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(count)
    })

})
