import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

function SelectButtons() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Button fullWidth variant="outlined" color="primary">
        <Typography variant="overline" gutterBottom>
          Top matching users
        </Typography>
      </Button>

      <Button fullWidth variant="outlined" color="primary">
        <Typography variant="overline" gutterBottom>
          Recommended movies
        </Typography>
      </Button>

      <Button fullWidth variant="outlined" color="primary">
        <Typography variant="overline" gutterBottom>
          Recommendations, item-based
        </Typography>
      </Button>
    </div>
  )
}

export default SelectButtons
