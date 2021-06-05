const express = require('express')
var router = express.Router();

const {Celebrity} = require('../model/celebrity')
const ObjectId = require('mongoose').Types.ObjectId

// retrieves all the records from database
router.get('/', (req, res) => {

    Celebrity.find((err, info) => {
        if (err) res.status(500).json({ error: "The users information could not be retrieved." })
        else res.send(info)
    })
})

// retrives user as per the matched user id 
router.get('/:id', (req, res) => {
    const id = req.params.id

    if (ObjectId.isValid(id)) {

        Celebrity.findById(id, (err, celebrity) => {
            if (err) res.status(500).json({ error: "The users information could not be retrieved." })
            else {
                if (celebrity) res.send(celebrity)

                else res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })

    } else {
        res.status(400).json({ error: 'Please enter valid id' })
    }
})

// adds new document into database
router.post('/', (req, res) => {

    if (req.body.name) {

        // user details
        const celebrity = new Celebrity({
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase
        })

        //saving data into database
        celebrity.save((err, celebrity) => {
            if (err) {
                res.status(500).json({ error: "There was an error while saving the user to the database" })
            }
            else res.status(201).json({ Created_Celebrity: celebrity })
        })
    } else {
        res.status(400).json({ error: 'Please provide name/email for the user' })
    }
})

// if the specified user id is found it will update the document with new data
router.put('/:id', (req, res) => {
    const id = req.params.id


    if (!ObjectId.isValid(id)) res.status(404).json({ error: 'Please enter valid id' })

    else if (req.body.name) {

        const celebrity = {
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase
        }

        Celebrity.updateOne({ '_id': id }, celebrity, (err, celebrity) => {
            if (err) res.status(500).json({ error: "The user information could not be modified." })
            else {
                res.redirect(`/info/${id}`)
            }
        })
    } else {
        res.status(400).json({ error: 'Please provide name/email for the user' })
    }
})

// deleted the user document if the specified user id is found 
router.delete('/:id', (req, res) => {
    const id = req.params.id

    if (ObjectId.isValid(id)) {

        Celebrity.findByIdAndRemove(id, (err, celebrity) => {
            if (err) res.status(500).json({ error: "The users information could not be retrieved." })
            else {
                if (celebrity) res.status(201).json({ message: "User was deleted Successfully" })

                else res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })

    } else {
        res.status(400).json({ error: 'Please enter valid id' })
    }
})



module.exports = router