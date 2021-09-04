import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { NestedList } from './NestedList'
import clematis_candy_stripe from '../images/clematis_candy_stripe.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

const ComplexTile = ({ data }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const { title, description, moreInfo, id, url } = data
  const backgroundColour = (data.petalColours && data.petalColours[0].hex) || 'white'

  const images = require.context('../../../public/images', true)

  console.log('images', images) // eslint-disable-line

  return (
    <Card className={classes.root} key={id}>
      <CardHeader title={title} style={{ backgroundColor: backgroundColour }} />
      <CardMedia className={classes.media} src={require(`../../../public/images/${url}.jpg`)} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <NestedList info={data} position="top" />
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <NestedList info={data} position="bottom" />
        </CardContent>
        <CardContent key={`cardContent-${id}`}>
          <Typography variant="body2" color="textSecondary" component="p">
            {moreInfo?.notes?.map((info) => {
              return <div key={info}>{info}</div>
            })}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export { ComplexTile }
