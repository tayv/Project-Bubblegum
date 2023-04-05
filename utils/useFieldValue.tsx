import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { format, startOfToday } from 'date-fns';

function useFieldDefaultValue(watch, setValue, field1Name, field2Name) {
  
  let datePickFieldValue = watch(field1Name, format(startOfToday(), 'MMM-dd-yyyy'))
  useEffect(() => {
    setValue(field2Name, datePickFieldValue);
  }, [datePickFieldValue])
  return field1Name
}

export default useFieldDefaultValue
