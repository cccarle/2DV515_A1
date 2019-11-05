const restify = require('restify')
const server = restify.createServer()
const PORT = 8080
const helpers = require('./helpers/convertCSV')

let usersCSV = './datasets/users.csv'
let moviesCSV = './datasets/movies.csv'
let ratingsCSV = './datasets/ratings.csv'

fetchData = async () => {
  let userData = await helpers.convertCSVTOJSON(usersCSV)
  let ratingData = await helpers.convertCSVTOJSON(ratingsCSV)
  let moviesData = await helpers.convertCSVTOJSON(moviesCSV)

  console.log(userData)
  console.log(ratingData)
  console.log(moviesData)
}

fetchData()

server.listen(PORT, () => {
  console.log('Successfully stared at localhost:' + PORT)
  require('./routes/root')(server)
})
