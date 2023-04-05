import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { format, startOfToday } from 'date-fns';

function useFieldDefaultValue(control, field1Name, field2Name) {
  const { setValue } = useFormContext();
 

  //const field1Value = watch(field1Name);
  let datePickFieldValue = useWatch(field1Name)

  useEffect(() => {
    setValue(field2Name, datePickFieldValue);
  }, [datePickFieldValue]);


}

export default useFieldDefaultValue
