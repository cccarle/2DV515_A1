import React from 'react'
import { useGlobal, actions } from '../store/store'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  }
})

export default function ResultsTable() {
  const [globalState, globalActions] = useGlobal()
  const classes = useStyles()

  function checkWhichAlgorithmForUser() {
    if (globalState.selectedAlgorithm == 'Euclidean') {
      return (
        <TableBody>
          {globalState.userRecommendationsEuclidean.map(row => (
            <TableRow key={row.userName}>
              <TableCell component="th" scope="row">
                {row.userName}
              </TableCell>
              <TableCell>{row.userID}</TableCell>
              <TableCell align="right">{row.sim}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      )
    } else if (globalState.selectedAlgorithm == 'Pearson') {
      return (
        <TableBody>
          {globalState.userRecommendationsPearson.map(row => (
            <TableRow key={row.userName}>
              <TableCell component="th" scope="row">
                {row.userName}
              </TableCell>
              <TableCell>{row.userID}</TableCell>
              <TableCell align="right">{row.pearsonSim}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      )
    }
  }

  function checkWhichAlgorithmForMovies() {
    if (globalState.selectedAlgorithm == 'Euclidean') {
      return (
        <TableBody>
          {globalState.movieRecommendationsEuclidean.map(row => (
            <TableRow key={row.MovieId}>
              <TableCell component="th" scope="row">
                {row.Title}
              </TableCell>
              <TableCell align="right">{row.MovieId}</TableCell>
              <TableCell align="right">{row.recommendationScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      )
    } else if (globalState.selectedAlgorithm == 'Pearson') {
      return (
        <TableBody>
          {globalState.movieRecommendationsPearson.map(row => (
            <TableRow key={row.MovieId}>
              <TableCell component="th" scope="row">
                {row.Title}
              </TableCell>
              <TableCell align="right">{row.MovieId}</TableCell>
              <TableCell align="right">
                {row.recommendationScorePearson}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      )
    }
  }

  function whichTableToShow() {
    if (globalState.resultTableState === 'users') {
      return (
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>ID</TableCell>
                <TableCell align="right">Sim</TableCell>
              </TableRow>
            </TableHead>
            {checkWhichAlgorithmForUser()}
          </Table>
        </Paper>
      )
    } else if (globalState.resultTableState === 'movies') {
      return (
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Movie</TableCell>
                <TableCell align="right">Movie ID</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            {checkWhichAlgorithmForMovies()}
          </Table>
        </Paper>
      )
    }
  }
  return <div> {whichTableToShow()} </div>
}
