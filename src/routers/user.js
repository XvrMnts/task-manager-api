const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/accounts')

const router = new express.Router()

const upload = multer({
    // instead that store in folder, we will store in model
    // if no dest, file will be available throgh req.file 
    //dest: 'avatars',
    limits: {
        filesize: 1000000
    },
    fileFilter(req, file, cb) {    

        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        } 
        cb (undefined, true) 
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    // we will use sharp module
    //req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error,req,res,next) => {
    res.status(400).send({error: error.message})    
})

router.post('/users',async (req,res) => {
    /* console.log(req.body)
    res.send("testing") */
    const user = new User(req.body)

    //Using async/await
    try {
        const token = await user.generateAuthToken()
        await user.save()
        sendWelcomeEmail(user.email,user.name)
        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e.stack)
        res.status(400).send(e.stack)
    }

    //

    //Using promises
    /* user.save().then(() => {
        res.status(201)
        res.send(user)
    }).catch((e) => {
        res.status(400)
        res.send(e)
    }) */
})

router.post('/users/login',  async (req,res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        
        //custom method defined in User model o send only public information
        //res.send({ user: user.getPublicProfile(), token })
        // the same can be achieved just definind a toJSON method, without explicitly indicating it here:
        res.send({ user: user, token })
    } catch(e) {
        //res.status(400).send(e.stack)
        res.status(400).send(e.stack)
    }
})

router.post('/users/logout', auth, async(req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()    
    } catch (error) {
        res.status(500).send()
    }
    
})

router.post('/users/logoutAll', auth, async(req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()    
    } catch (error) {
        res.status(500).send()
    }
    
})

router.get('/users/:id/avatar', async (req,res) => {
    id = req.params.id

    try {
        const user = await User.findById(id)
        if (!user || !user.avatar) {
            throw new error()
        }
        //res.set('Content-Type','image/jpg')
        res.set('Content-Type','image/png')
        res.send(user.avatar)    
    } catch (error) {
        res.status(404).send(error)    
    }


})


router.get('/users', auth, async (req,res) => {

    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }

    /* User.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((e) => {
        res.status(500).send()
    }) */
})

router.get('/users/me', auth, async (req,res) => {
    res.send(req.user)
})


router.get('/users/:id', async (req,res) => {

    return res.send(403)

    _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.send(user)    
    } catch (error) {
        res.status(500).send(error)    
    }

    /* User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)    
    }).catch((e) => {
        res.status(500).send()
    }) */
})

router.patch('/users/me', auth, async (req,res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]

    const isAllowedUpdate = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isAllowedUpdate) {
        return res.status(400).send({ error: "Update not allowed"})
    }
     

    try {
        const user = req.user
        const patchUser = req.body

        updates.forEach((update) => user[update] = patchUser[update])
        await user.save()
        
        res.status(200).send(user)    
    
    } catch (error) {
        res.status(400).send(error)    
    }

})

router.patch('/users/:id', async (req,res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name","email","password","age"]

    const isAllowedUpdate = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isAllowedUpdate) {
        return res.status(400).send({ error: "Update not allowed"})
    }
     

    try {
        const _id = req.params.id
        const patchUser = req.body

        // when using  findByIDanUpdate does not call pre or post middleware, so we have to manually update
        /* const user = await User.findByIdAndUpdate(_id, patchUser, {new: true, runValidators: true}) */
        
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        updates.forEach((update) => user[update] = patchUser[update])
        await user.save()
        // end of changes due to pre-post hooks
        
        res.status(200).send(user)    
    
    } catch (error) {
        res.status(400).send(error)    
    }

})


router.delete('/users/me', auth, async (req,res) => {
    user = req.user

    try {
        /* const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send("User not found")
        } */
        await user.remove()
        sendCancelationEmail(user.email,user.name)
        res.send(user)
    } catch (error) {
        res.status(500).send(error)    
    }
})


router.delete('/users/me/avatar', auth, async (req,res) => {
    user = req.user

    try {
        user.avatar = undefined
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(500).send(error)    
    }
})

router.delete('/users/:id', async (req,res) => {
    return res.send(403)

    _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.send(user)    
    } catch (error) {
        res.status(500).send(error)    
    }
})


module.exports = router