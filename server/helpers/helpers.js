const algorithms = require("../helpers/algorithms");

/* 
Returns an array with all users and the similarity-score against selectedUser
*/

exports.addSimValueForUsers = (selectedUser, users) => {
  users.forEach(user => {
    if (user.userID != selectedUser.userID)
      user.sim = parseFloat(algorithms.euclidean(selectedUser, user));
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

    movie.score = parseFloat(sum.toFixed(2));
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
            )
          };

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
  let a = [];
  users.forEach(user => {
    user.moviesUserHasRated.forEach(element => {
      if (movieID == element.MovieId) {
        let simUser = {
          userID: user.userID,
          userSim: user.sim,
          movieID: movieID
        };

        a.push(simUser);
      }
    });
  });

  return a;
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

    usersThatRatedTheMovie.forEach(user => {
      if (user.movieID == movie.MovieId) {
        totalSimOfMovie += user.userSim;
      }
    });

    movie.totalSimForUserThatSeenTheMovie = parseFloat(
      totalSimOfMovie.toFixed(2)
    );
  });
};
