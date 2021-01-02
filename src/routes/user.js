const express = require('express');

const router = express.Router();

const User = require('../model/User');
const Actors = require('../model/Actors');

router.post('/', async(req, res) => {
    console.log("hello");
    const newUser = new User(req.body);
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {

        res.status(500).send();
    }
});
router.get('/', async(req, res) => {
    console.log("hi");
    try {
        const projects = await User.find({});
        res.send(projects);
    } catch (error) {
        res.status(404).send({ error: 'Path not found' });
    }
});
router.get('/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send({ error: 'movie not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});
router.post('/Actors', async(req, res) => {
    console.log("hell");
    const newActors = new Actors(req.body);
    try {
        await newActors.save();
        res.status(201).send(newActors);
    } catch (err) {

        res.status(500).send();
    }
});

router.patch('/:id', async(req, res) => {
    console.log("hi0");
    const updates = Object.keys(req.body);
    const allowedUpdates = ['actorname', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Operation' });
    }

    try {
        const user = await Actors.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        updates.forEach((update) => {
            user[update] = req.body[update];
        });
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});
router.delete('/:id', async(req, res) => {
    console.log("log");
    try {
        const user = await Actors.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});



module.exports = router;