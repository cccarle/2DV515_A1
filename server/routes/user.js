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

      res.send(200, {
        message: `All Users`,
        users: users
      })

      next()
    } catch (err) {
      res.send(404, new errors.NotFoundError(err))
    }
  })

  /* 
  @route   POST /users
  @desc    Returns user-matches and movie-recommendations for a specific user by using euclidean.
  @access  Public
  */

  server.post(`/users/euclidean`, async (req, res, next) => {
    try {
      const { UserID } = req.body

      let users = await userController.fetchUsers()
      let ratings = await userController.fetchRatings()
      let movies = await userController.fetchMovies()

      let recommendations = await userController.findTopThreeMatchForUser(
        UserID,
        users,
        ratings,
        movies
      )

      res.send(200, {
        message: `user-matches and movie-recommendations for a ${users[UserID].Name} using euclidean`,
        recommendations: recommendations
      })

      next()
    } catch (err) {
      res.send(404, new errors.NotFoundError(err))
    }
  })

  /* 
  @route   POST /users
  @desc    Returns user-matches and movie-recommendations for a specific user by using pearson.
  @access  Public
  */

  server.post(`/users/pearson`, async (req, res, next) => {
    try {
      let users = await userController.fetchUsers()

      res.send(200, {
        message: `user-matches and movie-recommendations for a user(name) using pearson`,
        users: users
      })

      next()
    } catch (err) {
      res.send(404, new errors.NotFoundError(err))
    }
  })
}
