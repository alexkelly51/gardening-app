import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import db from '../../db.json'
import { ComplexTile } from './ComplexTile'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px',
  },
}))

const FullWidthGrid = () => {
  const classes = useStyles()
  const plants = db.plants

  const ComplexTiles = () => {
    return plants.map((plant) => {
      return <ComplexTile data={plant} />
    })
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <ComplexTiles />
      </Grid>
    </div>
  )
}

export { FullWidthGrid }
