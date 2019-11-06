import React, { useState } from 'react'
import useGlobalHook from 'use-global-hook'
import { fetchUsers } from '../actions'

const initialState = {
  users: []
}

export const actions = {
  setUsers: async (store, users) => {
    let allUsers = await fetchUsers()
    store.setState({ users: allUsers })
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
