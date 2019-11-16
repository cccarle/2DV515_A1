const userController = require('../controller/user')
const errors = require(`restify-errors`)

module.exports = server => {
  /* 
  @route   POST /ratings
  @desc    Returns user-matches and movie-recommendations for a specific user by using euclidean.
  @access  Public
  */

  server.post(`/recommendations/euclidean`, async (req, res, next) => {
    try {
      const { UserID, numberOfResults } = req.body

      let users = await userController.fetchUsers()
      let ratings = await userController.fetchRatings()
      let movies = await userController.fetchMovies()

      let recommendationsEuclidean = await userController.findRecommendations(
        UserID,
        users,
        ratings,
        movies,
        numberOfResults
      )

      res.json(200, {
        message: `user-matches and movie-recommendations for a ${users[UserID].Name} using euclidean`,
        recommendations: recommendationsEuclidean
      })

      next()
    } catch (err) {
      res.json(404, new errors.NotFoundError(err))
    }
  })

  /* 
  @route   POST /ratings
  @desc    Returns user-matches and movie-recommendations for a specific user by using pearson.
  @access  Public
  */

  server.post(`/recommendations/pearson`, async (req, res, next) => {
    try {
      const { UserID, numberOfResults } = req.body

      let users = await userController.fetchUsers()
      let ratings = await userController.fetchRatings()
      let movies = await userController.fetchMovies()

      let recommendationsPearson = await userController.findRecommendations(
        UserID,
        users,
        ratings,
        movies,
        numberOfResults
      )

      res.json(200, {
        message: `user-matches and movie-recommendations for a ${users[UserID].Name} using pearson`,
        recommendations: recommendationsPearson
      })

      next()
    } catch (err) {
      res.json(404, new errors.NotFoundError(err))
    }
  })
}
