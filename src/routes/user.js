const express = require('express');

const router = express.Router();

const User = require('../model/User');
const Actors = require('../model/Actors');


//to add movie

router.post('/', async(req, res) => {
    const newUser = new User(req.body);
    console.log(newUser);
    try {
        await newUser.save();
        res.status(201).send(newUser);
    } catch (err) {

        res.status(500).send();
    }
});

//to get all movies
router.get('/', async(req, res) => {
    console.log("hii");
    try {
        const projects = await User.find({});
        res.send(projects);
    } catch (error) {
        res.status(404).send({ error: 'Path not found' });
    }
});
// to get movie details using ID
router.get('/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        console.log(user);
        if (!user) {
            return res.status(404).send({ error: 'movie not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

// to add actors
router.post('/:id/Actors', async(req, res) => {
    console.log("hell");
    const newmovie = await User.findById(req.params.id);
    const newuser = new Actors(req.body);
    const newActors= await newuser.save();
    try {
        console.log(newmovie);
        console.log(newuser);
        await newActors.save();
        res.status(201).send(newActors);
    } catch (err) {

        res.status(500).send();
    }
});
// to update actor details using id
router.patch('/:id', async(req, res) => {
    console.log("hi");
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
//to delete actor details using actor id
router.delete('/:id', async(req, res) => {
    console.log("log");
    try {
        const user = await Actors.findByIdAndDelete(req.params.id);
        console.log(user);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});
router.get('/Actors/:moviename', async(req, res) => {
    
    try {
        const user = await User.find({name:req.params.moviename}).populate("actors");
        console.log(user);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Internal server error' });
    }
});

router.post('/:id/addActors', async (req, res) => {
	const newActors = new Actors(req.body);
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
        console.log(user);
		if (!user) {
			return res.status(404).send({ error: 'User not found' });
		}
		newActors.userId = user.id;
		await newActors.save();
		res.status(201).send(newActors);
        console.log(newActors);
	} catch (err) {
		res.status(500).send();
	}
});



module.exports = router;