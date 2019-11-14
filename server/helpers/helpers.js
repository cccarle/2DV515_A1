const algorithms = require("../helpers/algorithms");

/*
Returns an array with all users and the similarity-score against selectedUser
*/

exports.addSimValueForUsers = (selectedUser, users) => {
  users.forEach(user => {
    if (user.userID != selectedUser.userID)
      user.sim = parseFloat(algorithms.euclidean(selectedUser, user));
    user.pearsonSim = parseFloat(algorithms.pearson(selectedUser, user)); // add
    //  console.log(user);
  });

  return users;
};

/*
 Return user object with user-information and what movies the user has rated
 */

exports.createUserObject = (userData, ratingData) => {
  return userData.map(user => {
    return {
      userName: user.Name,
      userID: user.UserId,
      sim: 0,
      pearsonSim: 0,
      moviesUserHasRated: getRatingsFromUser(user.UserId, ratingData)
    };
  });
};

/*
 Return a users ratings by UserId
 */

const getRatingsFromUser = (user, ratings) => {
  return ratings.filter(rating => rating.UserId == user);
};

/*
 Return total WS-score for a movie
 */

const getTotalWsForMovie = (element, moviesWithWSScore) => {
  let ratingsSortedByMoives = moviesWithWSScore.filter(
    movie => movie.movieID == element.MovieId
  );

  return ratingsSortedByMoives.reduce(function(prev, cur) {
    let totalWS = prev + cur.ws;
    return parseFloat(totalWS.toFixed(4));
  }, 0);
};

/*
 Return total WS-score for a movie
 */

const getTotalWsPearsonForMovie = (element, moviesWithWSScore) => {
  let ratingsSortedByMoives = moviesWithWSScore.filter(
    movie => movie.movieID == element.MovieId
  );

  return ratingsSortedByMoives.reduce(function(prev, cur) {
    let totalWSPearson = prev + cur.wsPearson;
    return roundUp(totalWSPearson, 2);
  }, 0);
};

const roundUp = (num, precision) => {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
};

/*
 Returns movies selectedUser has not seen
 */

exports.getMoviesUserHasNotSeen = (user, ratings, movies) => {
  let movieIDsUserHasSeen = [];

  ratings.forEach(rating => {
    if (rating.UserId == user.userID) {
      movieIDsUserHasSeen.push(rating.MovieId);
    }
  });

  return movies.filter(movie => movieIDsUserHasSeen.indexOf(movie.MovieId) < 0);
};

/*
 Updates the moviesUserHasNotSeen movies with a total weightedScore for every movie
 */

exports.getTotalWSForMoviesUserHasNotSeen = (
  moviesUserHasNotSeen,
  usersWithSim
) => {
  moviesUserHasNotSeen.forEach(movie => {
    let sum = getTotalWsForMovie(
      movie,
      getWSForEveryMovieOnEveryUser(usersWithSim, moviesUserHasNotSeen)
    );

    let sumPearson = getTotalWsPearsonForMovie(
      movie,
      getWSForEveryMovieOnEveryUser(usersWithSim, moviesUserHasNotSeen)
    );

    movie.score = parseFloat(sum.toFixed(2));

    movie.wsPearsonTotal = sumPearson;
  });
};

/*
 Get WeightedScore for every user on the movie they rated
 */

const getWSForEveryMovieOnEveryUser = (usersWithSim, moviesUserHasNotSeen) => {
  let moviesWithWSScore = [];

  usersWithSim.forEach(user => {
    user.moviesUserHasRated.forEach(movie => {
      moviesUserHasNotSeen.forEach(a => {
        if (movie.MovieId == a.MovieId) {
          let moviee = {
            userID: movie.UserId,
            movieTitle: a.Title,
            movieID: a.MovieId,
            ws: parseFloat(
              (
                parseFloat(movie.Rating) * parseFloat(user.sim.toFixed(2))
              ).toFixed(4)
            ),
            wsPearson: 0
          };

          if (Math.sign(user.pearsonSim) != -1) {
            moviee.wsPearson = roundUp(
              parseFloat(movie.Rating) * user.pearsonSim,
              2
            );
          }

          moviesWithWSScore.push(moviee);
        }
      });
    });
  });

  return moviesWithWSScore;
};

/*
Checks if a user has rated the movie, if they have return the users SIM, ID and the movieID
 */

const checkWichUserThatHasRatedTheMovie = (movieID, users) => {
  let moviesArray = [];
  users.forEach(user => {
    user.moviesUserHasRated.forEach(element => {
      if (movieID == element.MovieId) {
        let simUser = {
          userID: user.userID,
          userSim: user.sim,
          userSimPearson: 0,
          movieID: movieID
        };

        if (Math.sign(user.pearsonSim) != -1) {
          simUser.userSimPearson = user.pearsonSim;
        }
        moviesArray.push(simUser);
      }
    });
  });

  return moviesArray;
};

/*
Sums the total sim from every user that has rated the movie.
Updates the movies totalSimOfMovie
 */

exports.sumTheMoviesSimFromUsersRatedTheMovie = (
  moviesUserHasNotSeen,
  usersWithSim
) => {
  moviesUserHasNotSeen.forEach(movie => {
    let usersThatRatedTheMovie = checkWichUserThatHasRatedTheMovie(
      movie.MovieId,
      usersWithSim
    );

    let totalSimOfMovie = 0;
    let totalSimPearsonOfMovie = 0;

    usersThatRatedTheMovie.forEach(user => {
      if (user.movieID == movie.MovieId) {
        totalSimOfMovie += user.userSim;
        totalSimPearsonOfMovie += user.userSimPearson;
      }
    });

    movie.totalSimForUserThatSeenTheMovie = parseFloat(
      totalSimOfMovie.toFixed(2)
    );

    movie.totalPearsonSim = roundUp(totalSimPearsonOfMovie, 2);
  });
};

/*
Update the recommendationScore for movie.
total WS score / total Sim from users seen the movie
 */

exports.divideTotalWSAndTotalSimForMovie = moviesUserHasNotSeen => {
  moviesUserHasNotSeen.forEach(movie => {
    movie.recommendationScore = parseFloat(
      (movie.score / movie.totalSimForUserThatSeenTheMovie).toFixed(2)
    );

    movie.recommendationScorePearson = roundUp(
      movie.wsPearsonTotal / movie.totalPearsonSim,
      2
    );
  });
};

/*
Returns recommendations by Descending order and number of choosen result count
 */

exports.getRecommendationsByDescendingOrder = (
  usersWithSim,
  moviesUserHasNotSeen,
  count
) => {
  usersWithSim.sort((a, b) => parseFloat(a.sim) - parseFloat(b.sim)).reverse();

  let resultOfUsers = usersWithSim.slice(0, count);

  moviesUserHasNotSeen
    .sort((a, b) => a.recommendationScore - b.recommendationScore)
    .reverse();

  let resultOfMovies = moviesUserHasNotSeen.slice(0, count);

  return { resultOfUsers, resultOfMovies };
};
