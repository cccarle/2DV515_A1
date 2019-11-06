import variabels from '../config/variables'
const axios = require('axios')

export const fetchUsers = async () => {
  return await axios
    .get(`${variabels.url}/users`)
    .then(response => {
      if (response.status === 200) {
        let users = response.data.users
        return users
      }
    })
    .catch(error => {
      return 'Something went wrong when fetching users ' + error
    })
}
