import React from 'react'
import { useGlobal, actions } from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import variabels from '../config/variables'
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
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  function getRecommendations() {
    globalActions.getRecommendationsForUser(
      globalState.selectedUser,
      globalState.selectedAlgorithm
    )
  }

  function upDateTableState(state) {
    globalActions.setResultTableState(state)
  }

  return (
    <div>
      <Button
        onClick={getRecommendations}
        fullWidth
        variant="outlined"
        color="primary"
      >
        <Typography variant="overline" gutterBottom>
          Get Recommendations
        </Typography>
      </Button>
      <div className={classes.container}>
        <Button
          onClick={() => upDateTableState(variabels.usersTable)}
          fullWidth
          variant="outlined"
          color="primary"
        >
          <Typography variant="overline" gutterBottom>
            Top matching users
          </Typography>
        </Button>

        <Button
          onClick={() => upDateTableState(variabels.moviesTable)}
          fullWidth
          variant="outlined"
          color="primary"
        >
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
    </div>
  )
}

export default SelectButtons
