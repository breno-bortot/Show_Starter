const express = require('express')
const router = express.Router()
const multer = require('multer')
const Project = require('../models/project')
const { authCreator } = require('../basicAuth')
const path = require('path')
const { route } = require('.')

const uploadPath = path.join('public', Project.projectImageBasePath)
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']

const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
      callback(null, imageMimeTypes.includes(file.mimetype))
  }
  
})



        
    

/* const path = require('path') */
/* const uploadPath = path.join('public', Project.projectImageBasePath)
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif']
 */



// Getting All Projects
router.get('/', async (req, res) => {
    let query = Project.find()
    if (req.query.locality != null && req.query.locality != '') {
        query = query.regex('locality', new RegExp(req.query.locality, 'i'))
    }
    if (req.query.title != null && req.query.title != '') {
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    if (req.query.creator != null && req.query.creator != '') {
        query = query.regex('creator', new RegExp(req.query.creator, 'i'))
    }
    if (req.query.eventAfter != null && req.query.eventAfter != '') {
        query = query.gte('eventDate', req.query.eventAfter)
    }
    if (req.query.eventBefore != null && req.query.eventBefore != '') {
        query = query.lte('eventDate', req.query.eventBefore)
    }
    try {
        const projects = await query.exec()
        res.json({
            projects: projects,
            searchOptions: req.query
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Getting One Project
router.get('/:id', getProject, (req, res) => {
    res.json(res.project)
})

// Creating Project

router.post('/', /* authCreator,  */ upload.single('image'),  async (req, res) => {
    console.log(req.file)
    const fileName = req.file !== null ? req.file.filename : null
    const titleExists = await Project.findOne({ title: req.body.title })
    if (titleExists) {
        return res.status(400).json({ error: `Project already exists` })
    }
    const project = new Project({

        title: req.body.title,
        creatorId: req.body.creatorId,
        eventDate: req.body.eventDate,
        locality: req.body.locality,
        description: req.body.description,
        image: fileName,
        video: req.body.video,
        rewards: req.body.rewards,
        fundGoal: req.body.fundGoal,
        expiresOn: req.body.expiresOn

    })
    try {
       
        const newProject = await project.save()
        res.status(201).json({ message: `New Project ${newProject.title} created`, newProject })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})


// Updating Project
router.patch('/:id', getProject, authCreator, async (req, res) => {
    if (req.body.title != null) {
        res.project.title = req.body.title
    }
    if (req.body.creator != null) {
        res.project.creator = req.body.creator
    }
    if (req.body.eventDates != null) {
        res.project.eventDates = req.body.eventDates
    }
    if (req.body.description != null) {
        res.project.description = req.body.description
    }
    if (req.body.image != null) {
        res.project.image = req.body.image
    }
    if (req.body.video != null) {
        res.project.video = req.body.video
    }
    if (req.body.rewards != null) {
        res.project.rewards = req.body.rewards
    }
    if (req.body.fundGoal != null) {
        res.project.fundGoal = req.body.fundGoal
    }
    if (req.body.expiresOn != null) {
        res.project.expiresOn = req.body.expiresOn
    }
    try {
        const updatedProject = await res.project.save()
        res.status(200).json(updatedProject)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})

// Deleting Project
router.delete('/:id', getProject, authCreator, async (req, res) => {
    try {
        await res.project.remove()
        res.json({ message: 'Project Deleted ' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


async function getProject(req, res, next) {
    let project
    try {
        project = await Project.findById(req.params.id)
        if (project == null) {
            return res.status(404).json({ error: 'Cannot find project' })
        }
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
    res.project = project
    next()
}

module.exports = router;
