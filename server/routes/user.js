const userController = require('../controller/user')
const errors = require(`restify-errors`)

module.exports = server => {
  /* 
  @route   GET /users
  @desc    Get all users
  @access  Public
  */

  server.get(`/users`, async (req, res, next) => {
    try {
      let users = await userController.fetchUsers()

      res.json(200, {
        message: `All Users`,
        users: users
      })

      next()
    } catch (err) {
      res.json(404, new errors.NotFoundError(err))
    }
  })
}
