const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    /* console.log(req.body)
    res.send("testing") */

    //const task = new Task(req.body)

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

})

// GET /tasks?completed=true
//GET /tasks?limit=10&skip=2
//GET /tasks?sortBy=createdAt:asc
router.get('/tasks', auth, async (req, res) => {

    // thirdOption:
    const match = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    const sort = {}
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1 
    }

    try {
        // two posibilities
        /* const tasks = await Task.find({ owner:req.user._id})
        res.status(200).send(tasks) */
 
        // or using populate ...
        /* await req.user.populate('tasks').execPopulate()
        res.status(200).send(req.user.tasks) */
        
        // third option
        await req.user.populate({
            path: 'tasks',
            // match: {
            //    completed: false
            //}
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                /* sort: {
                    createdAt: 1
                } */
                sort
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)


    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    _id = req.params.id

    try {
        //task = await Task.findById(_id)
        task = await Task.findOne({_id, owner:req.user._id})

        if (!task) {
            return res.status(404).send("Task not found")
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.patch('/tasks/:id', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "completed"]

    const isAllowedUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isAllowedUpdate) {
        return res.status(400).send({ error: "Update not allowed" })
    }


    try {
        const _id = req.params.id
        const patchTask = req.body

        //const task = await Task.findByIdAndUpdate(_id, patchTask, { new: true, runValidators: true })
        //const task = await Task.findByIdAndUpdate(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send("Task not found")
        }

        updates.forEach((update) => task[update] = patchTask[update])
        await task.save()
        res.status(200).send(task)

    } catch (error) {
        res.status(400).send(error)
    }

})


router.delete('/tasks/:id', auth, async (req, res) => {
    _id = req.params.id

    try {
        //task = await Task.findByIdAndDelete(_id)
        task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send("Task not found")
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router