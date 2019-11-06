import React from 'react'
import { useGlobal, actions } from '../store/store'
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

function AlgorithmSelect() {
  const [globalState, globalActions] = useGlobal()

  const classes = useStyles()

  const handleChange = event => {
    let selectedAlgorithm = event.target.value
    globalActions.selectAlgorithm(selectedAlgorithm)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-outlined-label"
          value={globalState.selectedAlgorithm}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
        >
          <MenuItem value="">Similarity</MenuItem>
          <MenuItem value={'Euclidean'}>Euclidean</MenuItem>
          <MenuItem value={'Pearson'}>Pearson</MenuItem>
        </Select>
        <FormHelperText>Similarity</FormHelperText>
      </FormControl>
    </div>
  )
}

export default AlgorithmSelect
