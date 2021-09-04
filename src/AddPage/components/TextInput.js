import React, { useState } from 'react'
import { TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const TextInput = ({ fieldOption, onChange }) => {
  const classes = useStyles()
  const [field, setField] = useState()

  const handleChange = (event) => {
    setField(event.target.value)
    onChange(event)
  }

  return (
    <div className={classes.root}>
      <TextField
        id={fieldOption}
        label={fieldOption}
        value={field}
        onChange={handleChange}
        variant="outlined"
        name={fieldOption}
      ></TextField>
    </div>
  )
}

export { TextInput }
