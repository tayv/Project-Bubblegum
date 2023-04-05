import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { format, startOfToday } from 'date-fns';

function useFieldDefaultValue(watch, setValue, defaultValue, inputNameWatch, inputNameSync) {
 
  // Watch the values of inputNameWatch and inputNameSync fields
  const inputValueWatch = watch(inputNameWatch, defaultValue);
  const inputValueSync = watch(inputNameSync, defaultValue);

  // State to track if the inputNameSync field value has been changed
  const [isInputSyncChanged, setIsInputSyncChanged] = useState(false);

  // Update inputNameSync field value to match inputNameWatch when inputNameSync hasn't been changed yet
  useEffect(() => {
    if (!isInputSyncChanged ) {
      setValue(inputNameSync, inputValueWatch);
    }
  }, [inputValueWatch, isInputSyncChanged, setValue]);

  // Set isInputSyncChanged to true when the inputNameSync field value is different from the default value
  useEffect(() => {
    if (inputValueSync !== defaultValue) {
      setIsInputSyncChanged(true);
    }
  }, [inputValueSync, defaultValue]);

  // Return the inputValueWatch to be used in the form
  return inputValueWatch;
}

export default useFieldDefaultValue;
