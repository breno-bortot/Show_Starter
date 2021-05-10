if (process.env.DATABASE_URL !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const Supporter = require('./models/supporter')
const Creator = require('./models/creator')


const indexRouter = require('./routes/index')
const projectsRouter = require('./routes/projects')
const creatorsRouter = require('./routes/creators')
const supportersRouter = require('./routes/supporters')
const pledgesRouter = require('./routes/pledges')
const { urlencoded } = require('express')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database...'))

app.use(express.static('./public'))
app.use(express.json())
app.use(urlencoded({ extended: false }))
app.use(setSupporter)
app.use(setCreator)

app.use('/', indexRouter)
app.use('/projects', projectsRouter)
app.use('/creators', creatorsRouter)
app.use('/supporters', supportersRouter)
app.use('/pledges', pledgesRouter)




async function setCreator(req, res, next) {
    try {
        const creatorId = req.body.creatorId
        if (creatorId) {
            req.creator = await Creator.findById(creatorId)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    next()
}
async function setSupporter(req, res, next) {
    try {
        const supporterId = req.body.supporterId
        if (supporterId) {
            req.supporter = await Supporter.findById(supporterId)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    next()
}


app.listen(5000, () => console.log('Server Started...'))