const express = require('express')
const router = express.Router()
const Supporter = require('../models/supporter')
const { authSupporter } = require('../basicAuth')
const { authRole } = require('../basicAuth')
const { canViewSupporter } = require('../permissions/permissions')

// Getting all Supporters
router.get('/', authSupporter, authRole('admin'), async (req, res) => {
    try {
        const supporters  = await Supporter.find()
        res.json(supporters)
    } catch (err) {
        res.status(500).json({ error: err.message })
    } 
})

// Getting Supporter Profile
router.get('/:id', getSupporter, authSupporter, authGetSupporter, (req, res) => {
    res.json(res.supporter)
})

// Updating Supporter
router.patch('/:id', getSupporter, authSupporter, async (req, res) => {
    if (req.body.username != null) {
        res.supporter.username = req.body.username
    }
    if (req.body.email != null) {
        res.supporter.email = req.body.email
    }
    if (req.body.password != null) {
        res.supporter.password = req.body.password
    }
    try {
        const updatedSupporter = await res.supporter.save()
        res.status(200).json(updatedSupporter)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})
// Updating Supporter-Role
router.patch('/:id',  getSupporter, authSupporter, authRole('admin'),  async (req, res) => {
    if (req.body.role != null) {
        res.supporter.role = req.body.role
    }
    try {
        const updatedSupporter = await res.supporter.save()
        res.status(200).json(updatedSupporter)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Deleting Supporter
router.delete('/:id', getSupporter,  authSupporter, async(req, res) => {
    try {
        await res.supporter.remove()
        res.json({ message: 'Supporter Deleted '})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

async function getSupporter(req, res, next) {
    let supporter
    try {
        supporter = await Supporter.findById(req.params.id)
        if (supporter == null) {
            return res.status(404).json({ error: 'Cannot find supporter' })
        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
    res.supporter = supporter
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