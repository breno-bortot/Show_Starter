const express = require('express')
const router = express.Router()
const Supporter = require('../models/supporter')
const Pledge = require('../models/pledge')
const Project = require('../models/project')
const { authSupporter } = require('../basicAuth')
const { authRole } = require('../basicAuth')

// Getting All Pledges
router.get('/', authSupporter, authRole('admin'),  async (req, res) => {
     try {
        const pledges  = await Pledge.find()
        res.json(pledges)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Getting One Pledge
router.get('/:id', getPledge, authSupporter, authGetSupporter, (req, res) => {
    res.json(res.pledge)
})
 
// Creating Pledge
router.post('/', authSupporter, async (req, res) => {
    const pledge = new Pledge({
        
        projectId: req.body.projectId,
        supporterId: req.body.supporterId,
        value: req.body.value,
        reward: req.body.reward,
        expiresOn: req.body.expiresOn,
        description: req.body.description        
 })
    try {
        const newPledge = await pledge.save()
        res.status(201).json({ message: `New Pledge ${newPledge.id} created`, newPledge})
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Deleting Pledge
router.delete('/:id', getPledge, authSupporter, async(req, res) => {
    try {
        await res.pledge.remove()
        res.json({ message: 'Pledge Deleted '})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


async function getPledge(req, res, next) {
    let pledge
    try {
        pledge = await Pledge.findById(req.params.id)
        if (pledge == null) {
            return res.status(404).json({ error: 'Cannot find pledge' })
        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
    res.pledge = pledge
    next()
}

async function authGetSupporter(req, res, next) {
    try {
     if(!canViewSupporter(req.supporter, req.params)){
         res.status(401)
         return res.send('Not Allowed') 
     } 
    } catch (err) {
     return res.status(500).json({ error: err.message })
 }
     next()
 }
module.exports = router;
