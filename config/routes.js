module.exports = app => {
    app.post('/signup', app.api.users.save) 
    app.post('/signIn', app.api.auth.signIn) 
    app.post('/send-securecode', app.api.auth.sendToken)
    app.post('/securecode-verification', app.api.auth.verifyToken)
    app.put('/new-password', app.api.users.newPassword)
    
    // app.route('/church')
    //     .all(app.config.passport.authenticate())
        
    //     .post(app.api.church.save)

    // app.route('/churchs/:user')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.church.churchs)

    
    // app.route('/remove/user/:user')
    //     .all(app.config.passport.authenticate())
    //     .delete(app.api.users.remove)
    
    // app.route('/users')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.users.allUsers)

    // app.route('/list-users-from-church/:church')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.users.usersByChurch)


}
