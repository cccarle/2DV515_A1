const covert = require('../helpers/convertCSV')
const helpers = require('../helpers/helpers')
let usersCSVPath = './datasets/users.csv'
let moviesCSVPath = './datasets/movies.csv'
let ratingsCSVPath = './datasets/ratings.csv'

exports.fetchUsers = async () => {
  return await covert.convertCSVTOJSON(usersCSVPath)
}

exports.fetchRatings = async () => {
  return await covert.convertCSVTOJSON(moviesCSVPath)
}

exports.fetchMovies = async () => {
  return await covert.convertCSVTOJSON(ratingsCSVPath)
}
