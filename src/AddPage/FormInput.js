import React, { useState } from 'react'
import { DropDownInput } from './components/DropDownInput'
import { TextInput } from './components/TextInput'

const FormInput = () => {
  const [data, setData] = useState({})

  const handleChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    const field = e.target.name

    setData({ ...data, [field]: value })
  }

  const handlePut = () => {
    try {
      fetch('http://localhost:3001/plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.log('error') // eslint-disable-line
    }
  }

  return (
    <form>
      <label>
        Title:
        <TextInput fieldOption={'title'} onChange={handleChange} />
      </label>
      <label>
        Description:
        <TextInput fieldOption={'description'} onChange={handleChange} />
      </label>
      <label>
        Position:
        <DropDownInput fieldOption={'position'} onChange={handleChange} />
      </label>
      <input type="submit" value="Put" onClick={handlePut} />
    </form>
  )
}

export { FormInput }
