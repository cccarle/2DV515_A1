import React from 'react'
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
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <TextField
        label="Result"
        className={classes.textField}
        helperText="Results"
        margin="normal"
      />
    </div>
  )
}

export default ResultsInput
