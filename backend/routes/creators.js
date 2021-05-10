const express = require('express')
const router = express.Router()
const Creator = require('../models/creator')
const Supporter = require('../models/supporter')
const { authCreator } = require('../basicAuth')
const { authSupporter } = require('../basicAuth')
const { authRole } = require('../basicAuth')
const { canViewCreator } = require('../permissions/permissions')

// Getting all Creators
router.get('/', authSupporter, authRole('admin'), async (req, res) => {
    try {
        const creators  = await Creator.find()
        res.json(creators)
    } catch (err) {
        res.status(500).json({ error: err.message })
    } 
})


// Getting Creator Profile
router.get('/:id', getCreator, authCreator, authGetCreator, (req, res) => {
    res.json(res.creator)
})

// Updating Creator
router.patch('/:id', getCreator, authCreator, async (req, res) => {
    if (req.body.username != null) {
        res.creator.username = req.body.username
    }
    if (req.body.email != null) {
        res.creator.email = req.body.email
    }
    if (req.body.password != null) {
        res.creator.password = req.body.password
    }
    if (req.body.bankAccount != null) {
        res.creator.bankAccount= req.body.bankAccount
    }
    
    try {
        const updatedSupporter = await res.creator.save()
        res.status(200).json(updatedSupporter)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Updating Creator-Role
router.patch('/:id', getCreator, authSupporter, authRole('admin'), async (req, res) => {
    if (req.body.role != null) {
        res.creator.role = req.body.role
    }
    try {
        const updatedSupporter = await res.supporter.save()
        res.status(200).json(updatedSupporter)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})
// Deleting Creator
router.delete('/:id', getCreator, authCreator, async(req, res) => {
    try {
        await res.creator.remove()
        res.json({ message: ' Creator Deleted '})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})



async function getCreator(req, res, next) {
    let creator
    try {
        creator = await Creator.findById(req.params.id)
        if (creator == null) {
            return res.status(404).json({ error: 'Cannot find creator' })
        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
    res.creator = creator
    next()
}

async function authGetCreator(req, res, next) {
    try {
     if(!canViewCreator(req.creator, req.params)){
         res.status(401)
         return res.send('Not Allowed') 
     } 
    } catch (err) {
     return res.status(500).json({ error: err.message })
 }
     next()
 }
 
 module.exports = router;