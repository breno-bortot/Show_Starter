if (process.env.DATABASE_URL !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const router = express.Router()
const Supporter = require('../models/supporter')
const Creator = require('../models/creator')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')



const initializePassport = require('../passport-config') 
initializePassport(
passport, 
username =>  Supporter.findOne({ username: username }),
id => Supporter.findById(id)
)


app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.session())



router.get('/',  (req, res) => {
    res.send('e aew baitola piranhuda')
})

// Registering Supporter
router.get('/reg_supporter',  (req, res) => {
    res.send('reg_supporter')
})

router.post('/reg_supporter', async (req, res) => {
    const emailExists = await Supporter.findOne({ email: req.body.email})
    const usernameExists = await Supporter.findOne({ username: req.body.username})
    if (emailExists) {
        return res.status(400).json({ error: `Email already exists`})
    }
    if (usernameExists) {
        return res.status(400).json({ error: `Username already exists`})
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const supporter = new Supporter({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword

        })
        const newSupporter = await supporter.save()
        res.status(201).json({ message: `New Account ${newSupporter.username} created` })
        res.redirect('/login_supporter')
    } catch (err) {
        res.status(400).json({ error: err.message })
        res.redirect('/reg_supporter')
    }
  
})

// Registering Creator
router.get('/reg_creator',  (req, res) => {
    res.send('reg_creator')
})

router.post('/reg_creator', async (req, res) => {
    const emailExists = await Creator.findOne({ email: req.body.email})
    const usernameExists = await Creator.findOne({ username: req.body.username})
    const cpfExists = await Creator.findOne({ cpf: req.body.cpf})
    const bankAccountExists = await Creator.findOne({ bankAccount: req.body.bankAccount})
    if (emailExists) {
        return res.status(400).json({ error: `Email already exists`})
    }
    if (usernameExists) {
        return res.status(400).json({ error: `Username already exists`})
    }
    if (cpfExists) {
        return res.status(400).json({ error: `CPF already exists`})
    }
    if (bankAccountExists) {
        return res.status(400).json({ error: `Bank Account already exists`})
    }

    
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const creator = new Creator({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        cpf: req.body.cpf,
        bankAccount: req.body.bankAccount

    })
       const newCreator = await creator.save()
        res.status(201).json({ message: `New Account ${newCreator.username} created` })
        res.redirect('/login_creator')
    } catch (err) {
        res.status(400).json({ error: err.message })
        res.redirect('/reg_creator')
    }
})


// Loging Supporter
router.get('/login_supporter',  (req, res) => {
    res.send('login_supporter')
})

router.post('/login_supporter', passport.authenticate('local', {
    successRedirect: '/projects',
    failureRedirect: '/login_supporter',
    failureFlash: true
})) 

// Loging Creator
router.get('/login_creator', (req, res) => {
    res.send('login_creator')
})




/*
app.post('/login', function(req, res) {
    User.findOne({username: req.body.username}, function(err, user) {

      if (!user.validPassword(req.body.password)) {
        //password did not match
      } else {
        // password matched. proceed forward
      }
    });
  }); */





module.exports = router;