import { useState } from 'react';

export interface FieldError {
  field: string;
  message: string;
}

export default function useErrors() {
  const [errors, setErrors] = useState<FieldError[]>([]);

  function setError({ field, message }: FieldError) {
    const errorAlreadyExists = errors.find((error) => error.field === field);
    if (errorAlreadyExists) return;

    setErrors((prevState) => [
      ...prevState,
      { field, message },
    ]);
  }

  function removeError(fieldName: string) {
    setErrors((prevState) => (
      prevState.filter((error) => error.field !== fieldName)
    ));
  }

  function getErrorMessageByFieldName(fieldName: string) {
    return errors.find((error) => error.field === fieldName)?.message ?? '';
  }

  return {
    setError,
    removeError,
    getErrorMessageByFieldName,
  };
}
