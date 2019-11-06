const covert = require('../helpers/convertCSV')
const helpers = require('../helpers/helpers')
let usersCSVPath = './datasets/users.csv'
let moviesCSVPath = './datasets/movies.csv'
let ratingsCSVPath = './datasets/ratings.csv'

exports.fetchUsers = async () => {
  return await covert.convertCSVTOJSON(usersCSVPath)
}

exports.fetchRatings = async () => {
  return await covert.convertCSVTOJSON(ratingsCSVPath)
}

exports.fetchMovies = async () => {
  return await covert.convertCSVTOJSON(ratingsCSVPath)
}

/*
 Matches user to all the other users, runs euclidean to get the score and then save it to a list.
 The list is sorted by the scores value and the list is returned with only top three matches
 */
exports.findTopThreeMatchForUser = (
  userToMatch,
  userData,
  ratingData,
  moviesData
) => {
  let scores = []

  let userToMatch1 = userData[userToMatch]

  userData.forEach(user => {
    if (user != userToMatch1) {
      let score = { User: user.Name, score: '' }
      score.score = helpers.euclidean(userToMatch1, user, ratingData)
      scores.push(score)
    }
  })

  scores.sort((a, b) => parseFloat(a.score) - parseFloat(b.score)).reverse() // sort by score value

  return scores.slice(0, 3)
}
