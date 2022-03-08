const { authSecret , token, email} = require('../.env') 
const jwt = require('jwt-simple') 
const bcrypt = require('bcrypt')

module.exports = app => {
    var message = undefined
    var user = undefined
    var secureCode = undefined
    var { transporter, options } = app.config.configEmail
    const { length } = token


    const signIn = async (req, res) => {
        console.log("payload: ",req.body)
        if ( (!req.body.email && !req.body.username) || !req.body.password) {
            message = 'Please type username or email and password.'
            return res.status(400).json(message)
        } 
          
        if (req.body.email) {
            user = await app.database('users')
                                    .where({ email: req.body.email }).first()
        }

        if (req.body.username) {
            user = await app.database('users').where({ username: req.body.username }).first()            
        }

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    message = 'Invalid password.'
                    return res.status(401).send(message)
                } 
                 
                const payload = { 'key': user['user_key'] }
                
                res.status(200).json({
                    username: user.username,
                    email: user.email,
                    token: jwt.encode(payload, authSecret)
                })
            })
        } else { 
            message = 'username or email is invalid.'
            res.status(400).send(message)
        }
    }

    const sendToken = async (req, res) => {
        var response = { error: undefined, success: undefined }
        var user = undefined
        var token = app.config.token.generate(length)
        

        if (!req.body.username) {
            message = 'Please type username or email.'
            return res.status(400).send(message)
        }

        user = await app.database('users')
                        .where({ username: req.body.username }).first()

        if (!user) {
            message = 'User not found!'
            return res.status(400).send(message)
        }

        options.to = user.email
        options.text = `${email.body}\n ${token}`
        
        transporter.sendMail(options, (err, success) => {
            if (success.accepted == user.email) {
                console.log('here:',success.accepted)
                secureCode = token
                message = `Email sent successfully to ${success.accepted}`
                return res.status(200).send(`sent email successfuly to ${success.accepted}`)
            } else {
                console.log(err)
                message = `Could not send email to ${user.email}`
                return res.status(400).send(message)
            }
        })
    }

    const verifyToken = (req, res) => {
        if (!req.body.token) {
            message = 'Please let us know your secure code.'
            return res.status(400).send(message)
        }

        if (req.body.token == secureCode) {
            message = 'Secure Code is match.'
            secureCode = null
            return res.status(200).send(message)
        } else {
            console.log(`Secure Code: ${secureCode}`)
            message = `The Secure Code is not match, please generate it again.`
            return res.status(400).send(message)
        }
    }
     
    return { signIn, sendToken, verifyToken }
}