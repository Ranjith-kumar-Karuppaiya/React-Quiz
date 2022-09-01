import { useState } from "react";

export default function useForm(getFreshModel0bject) {
  const [values, setValues] = useState(getFreshModel0bject());
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  };
}
