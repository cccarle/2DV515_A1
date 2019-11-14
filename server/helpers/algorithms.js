/* 
Returns the similarity-score
*/

exports.euclidean = (userA, userB, ratings) => {
  let sim = 0;
  let numberOfMatches = 0;
  let invertedScore = 0;

  // loop through each of the users ratings
  // if they have rated the same movie, do the stuff
  userA.moviesUserHasRated.forEach(ratingUserA => {
    userB.moviesUserHasRated.forEach(ratingUserB => {
      if (ratingUserA.MovieId == ratingUserB.MovieId)
        sim += (ratingUserA.Rating - ratingUserB.Rating) ** 2;
      numberOfMatches += 1;
    });
  });

  // no matches, return 0
  if (numberOfMatches == 0) {
    invertedScore = 0;
  }

  invertedScore = 1 / (1 + sim);

  return invertedScore.toFixed(4);
};
