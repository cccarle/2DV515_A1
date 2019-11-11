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

  function whichTableToShow() {
    if (globalState.resultTableState === 'users') {
      return (
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="right">Sim</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {globalState.userRecommendations.map(row => (
                <TableRow key={row.User}>
                  <TableCell component="th" scope="row">
                    {row.User}
                  </TableCell>
                  <TableCell align="right">{row.sim}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )
    } else if (globalState.resultTableState === 'movies') {
      console.log(globalState.movieRecommendations)
      return (
        <Paper className={classes.root}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Movie</TableCell>
                <TableCell align="right">Movie ID</TableCell>
                <TableCell align="right">Sim</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {globalState.movieRecommendations.map(row => (
                <TableRow key={row.movieID}>
                  <TableCell component="th" scope="row">
                    {row.movieName}
                  </TableCell>
                  <TableCell align="right">{row.movieID}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )
    }
  }
  return <div> {whichTableToShow()} </div>
}
