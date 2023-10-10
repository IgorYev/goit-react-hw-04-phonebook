import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactList from './ContactList/ContactList';
import PhoneBookForm from './PhonebookForm/PhonebookForm';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = event => {
    setFilter(event.target.value.toLowerCase());
  };

  const isNameUnique = name => {
    return !contacts.some(contact => contact.name === name);
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleSubmit = (name, number) => {
    if (name.trim() === '' || number.trim() === '') {
      alert('Please enter a name and a phone number');
      return;
    }

    if (!isNameUnique(name)) {
      alert('This name is already in contacts');
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <PhoneBookForm onSubmit={handleSubmit} />
      <h2>Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
