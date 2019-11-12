const userController = require("../controller/user");

/* 
Returns a array with all ratings from a user
*/

getRatingsFromUser = (user, ratings) => {
  return ratings.filter(rating => rating.UserId == user.UserId);
};

exports.getRatingsFromUser1 = (user, ratings) => {
  return ratings.filter(rating => rating.UserId == user.UserId);
};
/* 
Returns a array with all movies the "userToMatch" not seen
*/

exports.getMoviesUserHasNotSeen = (user, ratings, movies) => {
  let movieIDsUserHasSeen = [];

  ratings.forEach(rating => {
    if (rating.UserId == user.UserId) {
      movieIDsUserHasSeen.push(rating.MovieId);
    }
  });

  return movies.filter(movie => movieIDsUserHasSeen.indexOf(movie.MovieId) < 0);
};

/* 
Returns a array with all users and the similarity-score against userToMatch
*/

exports.findRecommendations = (
  userToMatch,
  users,
  ratings,
  movieIDs,
  moviesData
) => {
  let simOfUsers = getSimAndWSForUsers(userToMatch, users, ratings, movieIDs)
    .simOfUsersArray;
  let wsArray = getSimAndWSForUsers(userToMatch, users, ratings, movieIDs)
    .wsOfUsersArray;
  let moviesWithTotalWeightedScore = getTotalWeightedScoreForEveryMovie(
    movieIDs,
    wsArray
  );

  let recommendedMovies = [];

  moviesWithTotalWeightedScore.forEach(selectedMovie => {
    let movie = {
      movieName: getMovieTitleFromId(selectedMovie.movieID, moviesData),
      movieID: selectedMovie.movieID,
      total: divideTotalWSAndTotalSim(simOfUsers, selectedMovie.totalWS)
    };

    recommendedMovies.push(movie);
  });

  let similarityObj = {
    simUsers: getRecommendationsByDescendingOrder(simOfUsers, recommendedMovies)
      .simOfUsers,
    simMovie: getRecommendationsByDescendingOrder(simOfUsers, recommendedMovies)
      .recommendedMovies
  };

  return similarityObj;
};

/* 
Returns the similarity-score
*/

const euclidean = (A, B, ratings, moviesUserHasNotSeeen) => {
  let sim = 0;
  let numberOfMatches = 0;
  let userA = getRatingsFromUser(A, ratings); // Ratings from userA
  let userB = getRatingsFromUser(B, ratings); // Ratings from userB
  let invertedScore = 0;

  // loop through each of the users ratings
  // if they have rated the same movie, do the stuff

  for (Ar of userA) {
    for (Br of userB) {
      if (Ar.MovieId == Br.MovieId) {
        let minus = Ar.Rating - Br.Rating;
        sim += minus ** 2;
        numberOfMatches += 1;
      }
    }
  }

  // no matches, return 0
  if (numberOfMatches == 0) {
    invertedScore = 0;
  }

  invertedScore = 1 / (1 + sim);

  return invertedScore;
};

/* 
Get ratings from the movies user A has not seen
*/

const getRatingsFromMoviesSelectedUserHasNotSeen = (
  B,
  ratings,
  moviesUserHasNotSeeen
) => {
  let userB = getRatingsFromUser(B, ratings); // Ratings from userB
  let ratingsFromUser = [];

  userB.forEach(userB => {
    moviesUserHasNotSeeen.forEach(movieID => {
      if (userB.MovieId == movieID) {
        let user = {
          user: userB.UserId,
          movieId: userB.MovieId,
          rating: userB.Rating
        };
        ratingsFromUser.push(user);
      }
    });
  });

  return ratingsFromUser;
};

/* 
Get Movie Title by movieID
*/

const getMovieTitleFromId = (MovieID, moviesData) => {
  return moviesData.find(x => x.MovieId === MovieID).Title;
};

const getSimAndWSForUsers = (userToMatch, users, ratings, movieIDs) => {
  let simOfUsers = [];
  let wsArray = [];

  users.forEach(user => {
    if (user != userToMatch) {
      let user1 = {
        User: user.Name,
        userId: user.UserId,
        sim: euclidean(userToMatch, user, ratings, movieIDs)
      };

      simOfUsers.push(user1);

      let usersRatingsFromMovies = getRatingsFromMoviesSelectedUserHasNotSeen(
        user,
        ratings,
        movieIDs
      );

      simOfUsers.forEach(user => {
        usersRatingsFromMovies.forEach(element => {
          if (element.user == user.userId) {
            let wsObj = {
              userName: user.User,
              movieId: element.movieId,
              rating: element.rating,
              sim: user.sim,
              ws: parseFloat(user.sim) * parseFloat(element.rating)
            };

            wsArray.push(wsObj);
          }
        });
      });
    }
  });

  return { simOfUsersArray: simOfUsers, wsOfUsersArray: wsArray };
};

const getTotalWeightedScoreForEveryMovie = (movieIDs, wsArray) => {
  let movieWSTotalArray = [];

  movieIDs.forEach(movieID => {
    var result = wsArray.filter(obj => {
      return obj.movieId === movieID;
    });

    let sum = result.reduce(function(prev, cur) {
      return prev + cur.ws;
    }, 0);

    let movie = {
      movieID: movieID,
      totalWS: sum
    };

    movieWSTotalArray.push(movie);
  });

  return movieWSTotalArray;
};

const divideTotalWSAndTotalSim = (simOfUsers, totalWS) => {
  let totalSim = simOfUsers.reduce(function(prev, cur) {
    return prev + parseFloat(cur.sim);
  }, 0);

  return totalWS / totalSim;
};

const getRecommendationsByDescendingOrder = (simOfUsers, recommendedMovies) => {
  simOfUsers.sort((a, b) => parseFloat(a.sim) - parseFloat(b.sim)).reverse(); // sort by score value
  recommendedMovies.sort((a, b) => a.total - b.total).reverse();

  return { simOfUsers, recommendedMovies };
};
