import React, {FC} from 'react'
import { Input } from '@components/atoms/input'
import { useForm, Controller, useFormContext } from 'react-hook-form'
import { InputProps } from '@components/atoms/input'
import UpdateInputState from '@components/UpdateInputState'


const WrapperInput: FC<InputProps> = ({
  name,
  rules,
  control,
  label,
 // errors,
  onChange,
  defaultValue,
  ...props
}) => {
  

 //const { register, handleSubmit, getValues, formState: { errors } } = useForm()

 const PowerController = (props) => {
  const { formState } = useFormContext();
 // const isDirty = !!formState.dirtyFields[props.name];
  //const isTouched = !!formState.touched[props.name];
  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={props.defaultValue}
      render={(innerProps) => {
        return props.render({
          ...innerProps,
         // isDirty,
         // isTouched,
          warning: props.warn(innerProps.value)
        });
      }}
    />
  );
};

  return (
    <div>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input label={label} {...field} />
        )}
      />

    </div>  
  )
}

export default WrapperInput