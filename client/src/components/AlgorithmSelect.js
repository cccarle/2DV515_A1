import React from 'react'
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
  const classes = useStyles()
  const [age, setAge] = React.useState('')

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const handleChange = event => {
    setAge(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          ref={inputLabel}
          labelId="demo-simple-select-outlined-label"
          value={age}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          labelWidth={labelWidth}
        >
          <MenuItem value="">Similarity</MenuItem>
          <MenuItem value={10}>Euclidean</MenuItem>
          <MenuItem value={20}>Pearson</MenuItem>
        </Select>
        <FormHelperText>Similarity</FormHelperText>
      </FormControl>
    </div>
  )
}

export default AlgorithmSelect
