const UserRouter = require('./UserRoutes')

module.exports = (app) => {
    app.use('/api/user', UserRouter)
}