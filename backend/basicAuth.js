function authSupporter (req, res, next) {
    if(req.supporter == null) {
        res.status(401)
        return res.send('You need to login as a Supporter')
    }
    if(req.supporter.role == 'blocked') {
        res.status(401)
        return res.send('Your account is blocked')
    }
  
    next()
}

function authCreator (req, res, next) {
    if(req.creator == null) {
        res.status(401)
        return res.send('You need to login as a Creator')
    }
    if(req.creator.role == 'blocked') {
        res.status(401)
        return res.send('Your account is blocked')
    }
    
    next()
}

function authRole (role) {
    return (req, res, next) => {
        if(req.supporter.role !== role) {
            res.status(401)
            return res.send('Acces Denied')
        } 
        next()
    }
}

module.exports = {
    authSupporter,
    authCreator,
    authRole
}