const restify = require('restify')
const server = restify.createServer()
const PORT = 8080
const covert = require('./helpers/convertCSV')
const helpers = require('./helpers/helpers')
let usersCSV = './datasets/users.csv'
let moviesCSV = './datasets/movies.csv'
let ratingsCSV = './datasets/ratings.csv'

fetchData = async () => {
  let userData = await covert.convertCSVTOJSON(usersCSV)
  let ratingData = await covert.convertCSVTOJSON(ratingsCSV)
  let moviesData = await covert.convertCSVTOJSON(moviesCSV)

  let user1 = userData[0]
  let user2 = userData[5]

  euclidean(user1, user2, ratingData, moviesData)
}

euclidean = (A, B, ratings) => {
  let sim = 0
  let numberOfMatches = 0
  let userA = helpers.getRatingsFromUser(A, ratings) // Ratings from userA
  let userB = helpers.getRatingsFromUser(B, ratings) // Ratings from userB

  // loop through each of the users ratings
  // if they have rated the same movie, do the stuff
  for (Ar of userA) {
    for (Br of userB) {
      if (Ar.MovieId == Br.MovieId) {
        sim += Math.pow(Ar.Rating - Br.Rating, 2)
        numberOfMatches += 1
      }
    }
  }

  // no matches, return 0
  if (numberOfMatches == 0) {
    return 0
  }

  let invertedScore = 1 / (1 + sim)

  console.log(invertedScore.toString().slice(0, 6))
  return invertedScore.toString().slice(0, 3)
}

fetchData()

server.listen(PORT, () => {
  console.log('Successfully stared at localhost:' + PORT)
  require('./routes/root')(server)
})
