getRatingsFromUser = (user, ratings) => {
  let userRatingArray = []

  for (rating of ratings) {
    if (user.UserId == rating.UserId) {
      userRatingArray.push(rating)
    }
  }
  return userRatingArray
}

exports.euclidean = (A, B, ratings) => {
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

  //console.log(invertedScore.toString().slice(0, 6))
  return invertedScore.toString().slice(0, 6)
}
