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

/*     db.collection('users').insertOne({
        _id: id,
        name: 'Alba',
        age: 18
    }, (error,result) => {
        if (error) {
            return console.log('Unable to insert user')
        }
        console.log(result.ops)
    })
 */
 //   db.collection('users').insertMany([{
 //       name: 'Carlos',
 //       age: 47
 //       },{
 //       name: 'Isa',
 //       age: 47}
 //   ]
 //   , (error,result) => {
 //       if (error) {
 //           return console.log('Unable to insert users')
 //       }
 //       console.log(result.ops)
 //   })

/*     db.collection('tasks').insertMany([{
        description: 'Quantum book',
        completed: false
        },{
        description: 'Nodejs course',
        completed: 47}
    ]
    , (error,result) => {
        if (error) {
            return console.log('Unable to insert tasks!')
        }
        console.log(result.ops)
    }) */


})
