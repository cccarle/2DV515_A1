exports.getRatingsFromUser = (user, ratings) => {
  let userRatingArray = []

  for (rating of ratings) {
    if (user.UserId == rating.UserId) {
      userRatingArray.push(rating)
    }
  }
  return userRatingArray
}
