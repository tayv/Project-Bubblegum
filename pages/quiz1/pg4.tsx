import Breadcrumbs from '@components/Breadcrumbs'
import TextInput from '@components/TextInput'
import { useForm } from 'react-hook-form'

export default function () {
  let inputName = "testInput"
  const { register } = useForm()
  return (
    <>
      <Breadcrumbs></Breadcrumbs>
    
      <TextInput 
        register={register}
        fieldName="firstName"  
        label="This is a label"  
      />
      <p>Test Content</p>
    
    </>
    

  )

}