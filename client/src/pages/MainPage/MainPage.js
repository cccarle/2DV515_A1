import React from 'react'
import './MainPage.css'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import UserSelect from '../../components/UserSelect'
import AlgorithmSelect from '../../components/AlgorithmSelect'
import ResultsInput from '../../components/ResultsInput'
import ResultsTable from '../../components/ResultsTable'
import SelectButtons from '../../components/SelectButtons'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  }
}))

function MainPage() {
  const classes = useStyles()

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <div className={classes.container}>
            <UserSelect />
            <AlgorithmSelect />
            <ResultsInput />
          </div>

          <SelectButtons />
          <div>
            <ResultsTable />
          </div>
        </Container>
      </React.Fragment>
    </div>
  )
}

export default MainPage
