const userController = require('../controller/user')

/* 
Returns a array with all ratings from a user
*/

getRatingsFromUser = (user, ratings) => {
  return ratings.filter(rating => rating.UserId == user.UserId)
}

exports.getRatingsFromUser1 = (user, ratings) => {
  return ratings.filter(rating => rating.UserId == user.UserId)
}
/* 
Returns a array with all movies the "userToMatch" not seen
*/

exports.getMoviesUserHasNotSeen = (user, ratings, movies) => {
  let movieIDsUserHasSeen = []

  ratings.forEach(rating => {
    if (rating.UserId == user.UserId) {
      movieIDsUserHasSeen.push(rating.MovieId)
    }
  })

  return movies.filter(movie => movieIDsUserHasSeen.indexOf(movie.MovieId) < 0)
}

/* 
Returns a array with all users and the similarity-score against userToMatch
*/

exports.findUserSimilarites = (
  userToMatch,
  users,
  ratings,
  movieIDs,
  moviesData
) => {
  let result = []
  let wsArray = []

  users.forEach(user => {
    if (user != userToMatch) {
      let user1 = {
        User: user.Name,
        userId: user.UserId,
        sim: euclidean(userToMatch, user, ratings, movieIDs)
      }

      result.push(user1)

      let usersRatingsFromMovies = getRatingsFromMoviesSelectedUserHasNotSeen(
        userToMatch,
        user,
        ratings,
        movieIDs
      )

      result.forEach(user => {
        usersRatingsFromMovies.forEach(element => {
          if (element.user == user.userId) {
            let wsObj = {
              userName: user.User,
              movieId: element.movieId,
              rating: element.rating,
              sim: user.sim,
              ws: user.sim * element.rating
            }

            wsArray.push(wsObj)
          }
        })
      })
    }
  })

  let movieWSTotalArray = []

  movieIDs.forEach(element => {
    var result = wsArray.filter(obj => {
      return obj.movieId === element
    })

    let sum = result.reduce(function(prev, cur) {
      return prev + cur.ws
    }, 0)

    let movie = {
      movieID: element,
      totalWS: sum
    }

    movieWSTotalArray.push(movie)
  })

  let sumOfSim = result.reduce(function(prev, cur) {
    return prev + parseFloat(cur.sim)
  }, 0)

  let simMoviesArray = []

  movieWSTotalArray.forEach(element => {
    let movie = {
      movieName: getMovieNameFromId(element.movieID, moviesData),
      movieID: element.movieID,
      total: element.totalWS / sumOfSim
    }

    simMoviesArray.push(movie)
  })

  result.sort((a, b) => parseFloat(a.sim) - parseFloat(b.sim)).reverse() // sort by score value

  let similarityObj = {
    simUsers: result,
    simMovie: simMoviesArray
  }

  return similarityObj
}

/* 
Returns the similarity-score
*/

const euclidean = (A, B, ratings, moviesUserHasNotSeeen) => {
  let sim = 0
  let numberOfMatches = 0
  let userA = getRatingsFromUser(A, ratings) // Ratings from userA
  let userB = getRatingsFromUser(B, ratings) // Ratings from userB

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

  return invertedScore.toString().slice(0, 6)
}

const getRatingsFromMoviesSelectedUserHasNotSeen = (
  A,
  B,
  ratings,
  moviesUserHasNotSeeen
) => {
  let userB = getRatingsFromUser(B, ratings) // Ratings from userB
  let a = []

  userB.forEach(userB => {
    moviesUserHasNotSeeen.forEach(element => {
      if (userB.MovieId == element) {
        let user = {
          user: userB.UserId,
          movieId: userB.MovieId,
          rating: userB.Rating
        }
        a.push(user)
      }
    })
  })

  return a
}

const getMovieNameFromId = (MovieID, moviesData) => {
  return moviesData.find(x => x.MovieId === MovieID).Title
}
