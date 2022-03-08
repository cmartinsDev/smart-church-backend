const { secure_config, email } = require('../.env')
var nodemailer = require('nodemailer')
const {service, auth } = secure_config

module.exports = app => {
    var transporter = nodemailer.createTransport({
        service,
        auth      
    })
    
    var options = {
        'from': secure_config.auth.user,
        'to': undefined,
        'subject': email.subject,
        'text': undefined
    }
    
    return { transporter, options }
}
