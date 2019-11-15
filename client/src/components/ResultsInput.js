import React from 'react'
import { useGlobal, actions } from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '-0.7%'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

function ResultsInput() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  const handleChange = event => {
    globalActions.setResultCount(event.target.value)
  }

  return (
    <div className={classes.container}>
      <TextField
        label="Result"
        className={classes.textField}
        helperText="Results"
        margin="normal"
        onChange={handleChange}
      />
    </div>
  )
}

export default ResultsInput
