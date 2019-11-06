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
      let users = await userController.fetchUsers()

      res.send(200, {
        message: `user-matches and movie-recommendations for a user(name) using euclidean`,
        users: users
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

//       /*
// Matches user to all the other users, runs euclidean to get the score and then save it to a list.
// The list is sorted by the scores value and the list is returned with only top three matches
// */

// findTopThreeMatchForUser = (
//     userToMatch,
//     userData,
//     ratingData,
//     moviesData
//   ) => {
//     let scores = []

//     userData.forEach(user => {
//       if (user != userToMatch) {
//         let score = { User: user.Name, score: '' }
//         score.score = helpers.euclidean(
//           userToMatch,
//           user,
//           ratingData,
//           moviesData
//         )
//         scores.push(score)
//       }
//     })

//     scores
//       .sort((a, b) => parseFloat(a.score) - parseFloat(b.score))
//       .reverse() // sort by score value

//     console.log(scores)
//     return scores.slice(0, 3)
//   }

// fetchData = async () => {
//     let userData = await covert.convertCSVTOJSON(usersCSV)
//     let ratingData = await covert.convertCSVTOJSON(ratingsCSV)
//     let moviesData = await covert.convertCSVTOJSON(moviesCSV)
//     let user1 = userData[0]

//     findTopThreeMatchForUser(user1, userData, ratingData, moviesData)
//   }
