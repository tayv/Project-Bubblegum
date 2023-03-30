import { useState, ChangeEvent } from "react"

// This event handler has been replaced by Controller in react-hook-form

const UpdateInputState = () => {
  const [inputValue, setInputValue] = useState({})

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue({
      ...inputValue,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  console.log("Save this value to state", inputValue)
  return [inputValue, handleInputChange] // Need so we can use array destructuring when called in the component to make state available
}

export default UpdateInputState
