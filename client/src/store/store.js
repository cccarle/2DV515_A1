import React, { useState } from 'react'
import useGlobalHook from 'use-global-hook'
import { fetchUsersRequest, getRecommendationsForUserRequest } from '../actions'

const initialState = {
  users: [],
  selectedUser: '',
  selectedAlgorithm: '',
  userRecommendations: []
}

export const actions = {
  setUsers: async (store, users) => {
    let allUsers = await fetchUsersRequest()
    store.setState({ users: allUsers })
  },
  setSelectedUser: async (store, user) => {
    store.setState({ selectedUser: user })
  },
  selectAlgorithm: async (store, algorithm) => {
    store.setState({ selectedAlgorithm: algorithm })
  },
  getRecommendationsForUser: async (store, selectedUser, selectAlgorithm) => {
    let recommendations = await getRecommendationsForUserRequest(
      selectedUser,
      selectAlgorithm
    )

    store.setState({ userRecommendations: recommendations })
  }
}
export const useGlobal = useGlobalHook(React, initialState, actions)

export const LoggedInUserContext = React.createContext()

const Store = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState([])

  return (
    <LoggedInUserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      {children}
    </LoggedInUserContext.Provider>
  )
}

export default Store
