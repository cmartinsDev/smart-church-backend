const { authSecret } = require('../.env') 
const passport = require('passport')
const passportJWT = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJWT 
 
 
module.exports = app => { 
    const params = { 
        secretOrKey: authSecret, 
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    } 
     
    const strategy = new Strategy(params, (payload, done) => {
        app.database('users') 
        .where({ 'user_key': payload.key }) 
        .first() 
        .then(user => {
            if (user) {
                done(null, {userKey: user.user_key , username: user.username, email: user.email }  )
            } else {
                done(null, false)
            }
        })
        .catch(err => done(err, false))
    })

    passport.use(strategy) 
    return { 
        'initialize': () => passport.initialize(),
        'authenticate': () => passport.authenticate('jwt', { session: false } )
    }
}
