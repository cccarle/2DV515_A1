/* 
Returns the similarity-score
*/

exports.euclidean = (userA, userB, ratings) => {
  let sim = 0
  let numberOfMatches = 0
  let invertedScore = 0

  // loop through each of the users ratings
  // if they have rated the same movie, do the stuff
  userA.moviesUserHasRated.forEach(ratingUserA => {
    userB.moviesUserHasRated.forEach(ratingUserB => {
      if (ratingUserA.MovieId == ratingUserB.MovieId)
        sim += (ratingUserA.Rating - ratingUserB.Rating) ** 2
      numberOfMatches += 1
    })
  })

  // no matches, return 0
  if (numberOfMatches == 0) {
    invertedScore = 0
  }

  invertedScore = 1 / (1 + sim)

  return invertedScore.toFixed(2)
}

exports.pearson = (userA, userB) => {
  let sum1 = 0
  let sum2 = 0
  let sum1sq = 0
  let sum2sq = 0
  let pSum = 0
  let n = 0

  userA.moviesUserHasRated.forEach(ratingUserA => {
    userB.moviesUserHasRated.forEach(ratingUserB => {
      if (ratingUserA.MovieId == ratingUserB.MovieId) {
        sum1 += parseFloat(ratingUserA.Rating) //sum of ratings for user A
        sum2 += parseFloat(ratingUserB.Rating) //sum of ratings for user B
        sum1sq += parseFloat(ratingUserA.Rating) ** 2 //sum of squared ratings for A
        sum2sq += parseFloat(ratingUserB.Rating) ** 2 //sum of squared ratings for B
        pSum += parseFloat(ratingUserA.Rating * ratingUserB.Rating) //product of ratings from A and B
        n += 1 //number of ratings in common
      }
    })
  })

  // no matches, return 0
  if (n == 0) {
    return 0
  }

  //Calculate Pearson
  let num = pSum - (sum1 * sum2) / n
  let den = Math.sqrt((sum1sq - sum1 ** 2 / n) * (sum2sq - sum2 ** 2 / n))

  console.log(num / den)

  return (num / den).toFixed(2)
}
