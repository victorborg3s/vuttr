import { useState } from "react";

export const useToolForm = (callback) => {
    const [inputs, setInputs] = useState({title: '', link: '', description: '', tags: ''});
    const handleSubmit = (event) => {
      if (event) {
        event.preventDefault();
      }
      callback();
    }
    const handleInputChange = (event) => {
      event.persist();
      setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
    }
    return {
      handleSubmit,
      handleInputChange,
      inputs
    };
  }