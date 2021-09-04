import React, { useState } from 'react'
import { TextField, MenuItem, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const options = {
  position: [
    { value: 'Full Sun', label: 'Full Sun' },
    { value: 'Full Sun or Partial Shade', label: 'Full Sun or Partial Shade' },
    { value: 'Partial Shade', label: 'Partial Shade' },
    { value: 'Full Shade', label: 'Full Shade' },
    { value: 'Any', label: 'Any' },
  ],
}

const DropDownInput = ({ fieldOption, onChange }) => {
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
        select
        label={fieldOption}
        value={field}
        onChange={handleChange}
        variant="outlined"
        name={fieldOption}
      >
        {options[fieldOption].map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  )
}

export { DropDownInput }
