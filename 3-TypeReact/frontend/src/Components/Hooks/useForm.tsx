import React from 'react';


const useForm = (message:string) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  function validate(value:string) {
    if (value.length === 0) {
      setError(message);
      return false;
    } else {
      setError('');
      return true;
    }
  }

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
