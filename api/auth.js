const { authSecret , token, email} = require('../.env') 
const jwt = require('jwt-simple') 
const bcrypt = require('bcrypt')

module.exports = app => {
    var message = undefined
    var user = undefined
    var secureCodes = []
    var { transporter, options } = app.config.configEmail
    const { length } = token


    const signIn = async (req, res) => {
        if ( (!req.body.email && !req.body.username) || !req.body.password) {
            console.log(`[ERROR]: The username and password are missing.`)
            message = 'Please type username or email and password.'
            return res.status(400).json(message)
        } 
        
        
        if (req.body.email) {
            console.log(`[INFO]: Trying to find user with address email: ${req.body.email}`)
            user = await app.database('users')
                                    .where({ email: req.body.email }).first()
        }

        if (req.body.username) {
            console.log(`[INFO]: Trying to find user with username: ${req.body.username}`)
            user = await app.database('users').where({ username: req.body.username }).first()            
        }

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    console.log(`[ERROR]: Invalid password.`)
                    message = 'Invalid password.'
                    return res.status(401).send(message)
                }
                 
                const payload = { 'key': user['user_key'] }
                console.log(`[INFO]: User authenticated`)
                
                res.status(200).json({
                    username: user.username,
                    email: user.email,
                    token: jwt.encode(payload, authSecret)
                })

            })
        } else {
            console.log(`[ERROR]: the username ${req.body.username} or email ${req.body.email} is invalid.`)
            message = 'username or email is invalid.'
            res.status(400).send(message)
        }
    }

    const sendToken = async (req, res) => {
        if (!req.body.username) {
            console.log(`[ERROR]: username or email address is missing.`)
            message = 'Please type username or email.'
            return res.status(400).send(message)
        }
        
        console.log(`[INFO]: Looking for (email to username): ${req.body.username}`)
        var user = await app.database('users')
                            .where({ username: req.body.username }).first()
        
        if (!user) {
            console.log(`[ERROR]: user not found`)
            message = 'User not found!'
            return res.status(400).send(message)
        }
        
        console.log(`[INFO]: Just found the username: ${user.username}`)
        
        var code = app.config.token.generate(length)
        options.to = user.email
        options.text = `${email.body}\n ${code}`
        

        try {
            console.log(`[INFO]: Everything ready! Let's send email to ${user.email}.`)
            
            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.log(`[ERROR]: ${err}`)
                    message = `Could not send email to ${user.email}`
                    return res.status(400).send(message)
                }
                
                secureCodes.push({email: user.email, code })
                message = `Sent email with secure code to ${info.accepted[0]}`
                
                console.log(`[INFO]: ${message} - Secure Code: ${code}`)
                response = { message: message, email: info.accepted[0] }
    
                return res.status(200).json(response)
            })
            
        } catch (error) {
            console.log(`[ERROR]: ${error}`)
            return res.status(400).send(error.error)
        }


    }

    const verifyToken = (req, res) => {
        var isTokenMatch = undefined
        let response = {}

        console.log(`[INFO]: Trying to find username to generated this secure code: ${req.body.code}`)
        if (!req.body.code) {
            message = 'Please let us know your secure code.'
            return res.status(400).send(message)
        }

        if (secureCodes?.length > 0) {
            isTokenMatch = secureCodes.filter(s => s.code == req.body.code && s.email == req.body.email)
            
            console.log(isTokenMatch)
        }

        if (isTokenMatch?.length > 0) {
            console.log(`[INFO]: The secure code (${req.body.code}) is match with email address (${req.body.email})`)

            message = 'Secure Code is match.'
            response = { "sucess" : true, "message" : message }
            
            secureCodes = null
            return res.status(200).json(response)
        } else {
            console.log(`[INFO]: The secure code (${req.body.code}) is not match with email address (${req.body.email})`)
            
            message = `O codigo de seguranca nao corresponde. Por favor tente novamente.`
            response = { "sucess" : false, "message" : message }
            return res.status(400).json(message)
        }
    }
    
   return { signIn, sendToken, verifyToken }
}