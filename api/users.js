
const bcrypt = require('bcrypt')

module.exports = app => {
    let message = undefined

    const obterHash = (pass, callback) => {
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(pass, salt, (err, hash) => callback(hash)))
    } 

    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash
            app
            .database('users')
            .insert({ 
                'username': req.body.username,
                'email': req.body.email,
                'church_key': req.body.churchKey,
                password
            })
            .then(_ => res.status(204).send())
            .catch(err => { 
                res.status(400).send(err.detail)  
                console.log(err)
            })          
        })
    }

    const remove = (req, res) => {
        app.database('users')
            .where({ 'user_key': req.params.user })
            .del()
            .then(rowsAffected => {
                if (rowsAffected > 0) {
                    res.status(204).send()
                } else {
                    message = `Could not found user with user_key: ${req.params.userkey}`
                    res.status(400).send(message)
                }
            })
            .catch(err => res.json(err))
    }


    const allUsers = (req, res) => {
        app.database('users')
            .then(users => res.status(200).json(users))
            .catch(err => res.json(err))
    }

    const usersByChurch = (req, res) => {
        app.database('users as u')
            .select('u.*')
            .join('church as c', 'u.church_key', '=', 'c.church_key')
            .where({ 'church_key': req.params.church })
        .then(users => res.status(200).json(users))
        .catch(err => res.json(err))
    } 
     
    const updatePassword = (req, res) => { 
        app.database('users') 
            .where({ 'user_key': req.body.userKey }) 
            .update({ password: req.body.password})  
        .then(rowsAffected => { 
            if (rowsAffected > 0) {
                res.status(204).send()
            } else {
                message = `Could not update password`
                res.status(400).send(message)
            }
        }) 
        .catch(err => res.json(err))
    }

    return { save, remove, allUsers, usersByChurch, updatePassword }
}