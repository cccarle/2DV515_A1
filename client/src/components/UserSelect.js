import React from 'react'
import { useGlobal } from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

function UserSelect() {
  const [globalState] = useGlobal()
  const [selectedUser, setSelectedUser] = React.useState('')
  const classes = useStyles()

  const handleChange = event => {
    setSelectedUser(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-outlined-label"
          value={selectedUser}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">User</MenuItem>
          {globalState.users.map(user => (
            <MenuItem key={user.UserId} value={user.UserId}>
              {user.Name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select User</FormHelperText>
      </FormControl>
    </div>
  )
}

export default UserSelect
