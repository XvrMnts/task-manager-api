const request = require('supertest')
const app = require('../src/app')
//const User = require('../src/models/user')
const Tasks = require('../src/models/task')
//const jwt = require('jsonwebtoken')
//const mongoose = require('mongoose')
const { userOneId, userOne, userTwo, userTwoId, taskOne, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            description: "From test"
        })
        .expect(201)

        const task = await Task.findById(response.body._id)
        expect(task).not.toBeNull()
        expect(task.completed).toEqual(false)

    
})

test('Should get all tasks or user one', async () => {
    const response = await request(app)
    .get('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toBe(2)

})

test('Should userTwo not delete userOne tasks', async () => {
    const response = await request(app)
    .delete('/tasks/'+taskOne._id)
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()

})