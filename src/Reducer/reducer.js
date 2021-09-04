import React, { useReducer } from 'react'
import { type, types } from './actionTypes'

const initialState = {
  title: '',
  // description: '',
  // imageSrc: '',
  // watering: '',
  // pruningTime: '',
  // feedingTime: '',
  // position: '',
  // flowers: '',
  // petalColours: [{ hex: '', name: '' }],
  // scented: true,
  // height: '',
  // width: "'2 meter'",
  // deciduous: true,
  // family: '',
  // genus: '',
  // variety: '',
  // cultivar: '',
  // habit: '',
  // purchaseInfo: {
  //   pricePaid: 0,
  //   broughtFrom: '',
  //   dateBrought: '',
  // },
}

function reducer(state, action) {
  console.log('state', state) // eslint-disable-line
  console.log('action', action) // eslint-disable-line
  switch (action.type) {
    case types.UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      }
    default:
      throw new Error()
  }
}

const usePlant = () => {
  const [plant, dispatch] = useReducer(reducer, initialState)

  const updateTitle = (title) => {
    dispatch({ type: type.UPDATE_TITLE, title: title })
  }

  return {
    plant,
    updateTitle,
  }
}

export { usePlant }
