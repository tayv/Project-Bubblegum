import {useState, ChangeEvent} from 'react'

const UpdateInputState = () => {

  const [inputValue, setInputValue] = useState({})

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({
      ...inputValue, 
      [e.currentTarget.name]: e.currentTarget.value
    })
    return [inputValue, handleInputChange] // Need so we can use array destructuring when called in the component to make state available
  }
}

export default UpdateInputState