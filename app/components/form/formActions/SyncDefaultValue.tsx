"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { useFormContext, useWatch, useFormState } from "react-hook-form";

type SyncDefaultValuesProps = {
  defaultValue?: string | number | Date; // Should be passed at Form level not Field level
  syncDefaultWith: string;
  name: string;
  children: ReactNode;
};

// NOTE: This component requires the form be wrapped with RHF's FormProvider

function SyncDefaultValue({
  name,
  defaultValue,
  syncDefaultWith,
  children,
}: SyncDefaultValuesProps) {
  const methods = useFormContext();
  const { control, setValue } = methods;
  const { dirtyFields, touchedFields } = useFormState(); // Used to check the sync/watch fields have been touched so that we can stop syncing

  const inputValueWatch = useWatch({
    control,
    name: syncDefaultWith,
    defaultValue,
  });

  const [stopSync, setStopSync] = useState(false);

  useEffect(() => {
    // When inputValueWatch's value changes check that stopSync is false (ie. user hasn't manually chosen a value for inputValueSync field).
    if (!stopSync) {
      // sync the defaultValue of inputValueSync to match value of inputValueWatch
      setValue(name, inputValueWatch);
    }
  }, [inputValueWatch, stopSync, name, setValue]);

  // This should run whenever the input being synced is touched/changed to see if we need to stop syncing.
  // Stop syncing once user interacts with field to avoid confusing them
  useEffect(() => {
    // Check for dirtyFields as well because Date Pick input is readOnly and doesn't register a touch
    touchedFields[name] || dirtyFields[name] ? setStopSync(true) : null;
  }, [dirtyFields?.[name], touchedFields?.[name]]); // Specify exact property as formState object reference doesn't change. ? needed to guard against undefined.

  return (
    <>
      {children}
      <p>Field is touched: {stopSync ? "true" : "false"}</p>
    </>
  ); // The Field component is typically rendered here
}

export default SyncDefaultValue;
