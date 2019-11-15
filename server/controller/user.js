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
  return await covert.convertCSVTOJSON(moviesCSVPath)
}

/*
 Matches user to all the other users, runs euclidean to get the score and then save it to a list.
 The list is sorted by the scores value and the list is returned with only top three matches
 */

exports.findRecommendations = (
  userToMatch,
  userData,
  ratingData,
  moviesData,
  numberOfResults
) => {
  let users = helpers.createUserObject(userData, ratingData)
  let selectedUser = users[userToMatch]
  helpers.removeSelectedUserFromList(users, selectedUser)
  let usersWithSim = helpers.addSimValueForUsers(selectedUser, users)
  let moviesUserHasNotSeen = helpers.getMoviesUserHasNotSeen(
    selectedUser,
    ratingData,
    moviesData
  )

  helpers.getTotalWSForMoviesUserHasNotSeen(moviesUserHasNotSeen, usersWithSim)
  helpers.sumTheMoviesSimFromUsersRatedTheMovie(
    moviesUserHasNotSeen,
    usersWithSim
  )
  helpers.divideTotalWSAndTotalSimForMovie(moviesUserHasNotSeen)

  let recommendations = {
    recommendedUsersEuclidean: helpers.getRecommendationsByDescendingOrderEuclidean(
      usersWithSim,
      moviesUserHasNotSeen,
      numberOfResults
    ).resultOfUsers,
    recommendedMovieEuclidean: helpers.getRecommendationsByDescendingOrderEuclidean(
      usersWithSim,
      moviesUserHasNotSeen,
      numberOfResults
    ).resultOfMovies,
    recommendedUsersPearson: helpers.getRecommendationsByDescendingOrderPearson(
      usersWithSim,
      moviesUserHasNotSeen,
      numberOfResults
    ).resultOfUsersPearson,
    recommendedMoviePearson: helpers.getRecommendationsByDescendingOrderPearson(
      usersWithSim,
      moviesUserHasNotSeen,
      numberOfResults
    ).resultOfMoviesPearson
  }

  return recommendations
}
