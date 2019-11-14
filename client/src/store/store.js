import React, { useState } from "react";
import useGlobalHook from "use-global-hook";
import {
  fetchUsersRequest,
  getRecommendationsForUserRequest
} from "../actions";

const initialState = {
  users: [],
  selectedUser: "",
  selectedAlgorithm: "",
  userRecommendationsEuclidean: [],
  movieRecommendationsEuclidean: [],
  userRecommendationsPearson: [],
  movieRecommendationsPearson: [],
  resultTableState: "users",
  resultCount: 100
};

export const actions = {
  setUsers: async (store, users) => {
    let allUsers = await fetchUsersRequest();
    store.setState({ users: allUsers });
  },
  setSelectedUser: async (store, user) => {
    store.setState({ selectedUser: user });
  },
  selectAlgorithm: async (store, algorithm) => {
    store.setState({ selectedAlgorithm: algorithm });
  },
  getRecommendationsForUser: async (
    store,
    selectedUser,
    selectAlgorithm,
    resultCount
  ) => {
    let recommendations = await getRecommendationsForUserRequest(
      selectedUser,
      selectAlgorithm,
      resultCount
    );

    store.setState({
      userRecommendationsEuclidean: recommendations.recommendedUsersEuclidean
    });
    store.setState({
      movieRecommendationsEuclidean: recommendations.recommendedMovieEuclidean
    });
    store.setState({
      userRecommendationsPearson: recommendations.recommendedUsersPearson
    });
    store.setState({
      movieRecommendationsPearson: recommendations.recommendedMoviePearson
    });
  },
  setResultTableState: async (store, state) => {
    store.setState({ resultTableState: state });
  },
  setResultCount: async (store, count) => {
    store.setState({ resultCount: count });
  }
};

export const useGlobal = useGlobalHook(React, initialState, actions);

export const GlobalContext = React.createContext();

const Store = ({ children }) => {
  const [globalState, globalActions] = useState([]);
  return (
    <GlobalContext.Provider value={[globalState, globalActions]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Store;
