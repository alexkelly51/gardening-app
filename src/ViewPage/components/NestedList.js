import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Tooltip } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Link from '@material-ui/core/Link'
import DateRangeIcon from '@material-ui/icons/DateRange'
import Help from '@material-ui/icons/Help'
import OpacityIcon from '@material-ui/icons/Opacity'
import LocalFloristIcon from '@material-ui/icons/LocalFlorist'
import { Brightness5, Brightness6, Cloud } from '@material-ui/icons'
import {
  faCut,
  faSyringe,
  faRulerVertical,
  faRulerHorizontal,
  faTree,
  faLeaf,
  faDumbbell,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clematisInfo } from '../../extraNotes/clematis'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const NestedList = ({ info, position }) => {
  const classes = useStyles()

  const infoForRenderTop = []
  const infoForRenderBottom = []

  const ListItems = ({ icon, iconText, infoUrl, keyId }) => {
    return (
      <ListItem key={keyId}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={iconText} />
        {infoUrl && (
          <Tooltip title="what does this mean?">
            <Link href={infoUrl} target="_blank" rel="noopener">
              <Help />
            </Link>
          </Tooltip>
        )}
      </ListItem>
    )
  }

  if (info.position) {
    const icon =
      info.position === 'Full Sun' ? (
        <Brightness5 />
      ) : 'Full Sun or Partial Shade' ? (
        <span>
          <Brightness5 />
          <Brightness6 />
        </span>
      ) : 'Partial Shade' ? (
        <Brightness6 />
      ) : (
        <Cloud />
      )

    infoForRenderBottom.push(<ListItems icon={icon} iconText={info.position} keyId={`position-${info.id}`} />)
  }

  if (info.flowers) {
    infoForRenderBottom.push(
      <ListItems icon={<DateRangeIcon />} iconText={info.flowers} keyId={`flowers-${info.id}`} />
    )
  }

  if (info.petalColours) {
    const colourSquares = info.petalColours.map((info) => {
      return (
        <div
          keyId={`petalColours-${info.hex}-${info.id}`}
          style={{ height: '20px', width: '20px', backgroundColor: info.hex }}
        ></div>
      )
    })

    const colourNames = info.petalColours.reduce((acc, cur) => {
      acc = acc + '/' + cur.name

      return acc
    }, '')

    infoForRenderBottom.push(
      <ListItems
        icon={<>{colourSquares}</>}
        iconText={colourNames}
        keyId={`petalColours-${info.petalColours}-${info.id}`}
      />
    )
  }

  if (info.scented) {
    infoForRenderBottom.push(
      <ListItems icon={<LocalFloristIcon />} iconText={'scented'} keyId={`scented-${info.id}`} />
    )
  }

  if (info.watering) {
    infoForRenderTop.push(<ListItems icon={<OpacityIcon />} iconText={info.watering} keyId={`watering-${info.id}`} />)
  }

  if (info.pruningTime) {
    infoForRenderTop.push(
      <ListItems icon={<FontAwesomeIcon icon={faCut} />} iconText={info.pruningTime} keyId={`pruningTime-${info.id}`} />
    )
  }

  if (info.feedingTime) {
    infoForRenderTop.push(
      <ListItems
        icon={<FontAwesomeIcon icon={faSyringe} />}
        iconText={info.feedingTime}
        keyId={`feedingTime-${info.id}`}
      />
    )
  }
  if (info.height) {
    infoForRenderBottom.push(
      <ListItems icon={<FontAwesomeIcon icon={faRulerVertical} />} iconText={info.height} keyId={`height-${info.id}`} />
    )
  }

  if (info.width) {
    infoForRenderBottom.push(
      <ListItems icon={<FontAwesomeIcon icon={faRulerHorizontal} />} iconText={info.width} keyId={`width-${info.id}`} />
    )
  }

  if (info.deciduous) {
    const icon = info.deciduous ? <FontAwesomeIcon icon={faLeaf} /> : <FontAwesomeIcon icon={faTree} />
    const text = info.deciduous ? 'deciduous' : 'evergreen'

    infoForRenderBottom.push(<ListItems icon={icon} iconText={text} keyId={`deciduous-${info.id}`} />)
  }

  if (info.hardiness) {
    const url = 'https://www.rhs.org.uk/plants/trials-awards/award-of-garden-merit/rhs-hardiness-rating'
    infoForRenderBottom.push(
      <ListItems
        icon={<FontAwesomeIcon icon={faDumbbell} />}
        iconText={info.hardiness}
        infoUrl={url}
        keyId={`hardiness-${info.id}`}
      />
    )
  }

  // if (info.genus) {
  //   const isClematis = info.genus === 'Clematis' ? true : false

  //   if (isClematis) {
  //     const clematisLevel = info.moreInfo.clematisLevel
  //     console.log('clematisLevel', clematisLevel) // eslint-disable-line
  //     const notes = clematisInfo[clematisLevel].notes
  //     console.log('notes', notes) // eslint-disable-line
  //     info.moreInfo.notes.push(notes)
  //   }
  // }

  const InfoToRenderBottom = () => {
    return infoForRenderBottom.map((items) => items)
  }

  const InfoToRenderTop = () => {
    return infoForRenderTop.map((items) => items)
  }

  return (
    <List
      key={info.id}
      className={classes.root}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" key={`subheader-${info.id}`}>
          {info.genus}/ {info.variety}/ {info.cultivar}
        </ListSubheader>
      }
    >
      {position === 'top' ? <InfoToRenderTop /> : <InfoToRenderBottom />}
    </List>
  )
}

export { NestedList }
