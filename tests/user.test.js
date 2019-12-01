const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
/* const jwt = require('jsonwebtoken')
const mongoose = require('mongoose') */
const { userOneId, userOne, setupDatabase} = require('./fixtures/db')


/* 
beforeEach( async () => {
    //console.log('beforeEach')
    //await User.deleteMany()
    //await new User(userOne).save()
})
 */

beforeEach(setupDatabase)


afterEach(() => {
    //console.log('afterEach')
})


test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: "XvrMnts",
        email: "xxvr.mounts@icloud.com",
        password: "zaqwerfv"
    }).expect(201)

    // Assert that DB was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions above teh respones
    expect(response.body.user.name).toBe('XvrMnts')
    expect(response.body).toMatchObject({
        user: {
            name: "XvrMnts",
            email: "xxvr.mounts@icloud.com" 
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('zaqwerfv')

})


test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(response.body.user._id)
    expect(response.body).toMatchObject({
        token: user.tokens[1].token
    })

    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: "unknown@nowehere",
        password: "easyPisi"
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})


test('Should not get profile for unauth user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})


test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

        const user = await User.findById(userOneId)
        expect(user).toBeNull()

})

test('Should not delete account for unuath user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg' )
        .expect(200)

        const user = await User.findById(userOneId)
        // object comparison
        expect({}).toEqual({})

        expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async ()=> {
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name: "Alba"
    })
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toBe("Alba")

})

test('Should not update invvalid user fields', async ()=> {
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location: "Philadelphia"
    })
    .expect(400)

})