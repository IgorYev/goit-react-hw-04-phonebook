import React, { useState } from 'react';
import css from '../PhonebookForm/PhonebookForm.module.css';

const PhoneBookForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form className={css.formField} onSubmit={handleSubmit}>
      <input
        className={css.fieldName}
        type="text"
        name="name"
        required
        value={name}
        onChange={handleChange}
        placeholder="Enter name"
      />
      <input
        className={css.fieldNumber}
        type="tel"
        name="number"
        required
        value={number}
        onChange={handleChange}
        placeholder="Number"
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default PhoneBookForm;
