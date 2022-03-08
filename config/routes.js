module.exports = app => {
    app.post('/signup', app.api.users.save) 
    app.post('/signIn', app.api.auth.signIn) 
    app.post('/send-token', app.api.auth.sendToken)
    app.post('/verify-token', app.api.auth.verifyToken)

    app.put('/change-pasword', app.api.users.updatePassword)
    
    app.route('/church')
        .all(app.config.passport.authenticate())
        
        .post(app.api.church.save)

    app.route('/churchs/:user')
        .all(app.config.passport.authenticate())
        .get(app.api.church.churchs)

    
    app.route('/remove/user/:user')
        .all(app.config.passport.authenticate())
        .delete(app.api.users.remove)
    
    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.api.users.allUsers)

    app.route('/list-users-from-church/:church')
        .all(app.config.passport.authenticate())
        .get(app.api.users.usersByChurch)


}
