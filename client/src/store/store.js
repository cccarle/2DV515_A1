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
  userRecommendations: [],
  movieRecommendations: [],
  userRecommendationsPearson: [],
  movieRecommendationsPearson: [],
  resultTableState: "users",
  resultCount: 0
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

    store.setState({ userRecommendations: recommendations.simUsers });
    store.setState({
      userRecommendationsPearson: recommendations.simUsersPearson
    });
    store.setState({ movieRecommendations: recommendations.simMovie });
    store.setState({
      movieRecommendationsPearson: recommendations.simMoviePearson
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
