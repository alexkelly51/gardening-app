import React from 'react'
import { FullWidthGrid } from './components/Grid'

const ViewPage = () => {
  return <FullWidthGrid />
}

export { ViewPage }

// const handleFetch = () => {
//   setLoading(true)

//   try {
//     fetch('http://localhost:3001/plants')
//       .then((res) => res.json())
//       .then((result) => {
//         setLoading(false)
//         setData(result)
//       })
//   } catch (error) {
//     console.log('error') // eslint-disable-line
//   }
// }
