import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { Title } from './Contacts/Contacts.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = values => {
    const { name, number } = values;

    if (this.state.contacts.some(contact => contact.name === name)) {
      alert(`Contact with name "${name}" already exists!`);
      return;
    }

    const newContact = {
      id: nanoid(),

      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleChangeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <Title>Phonebook</Title>
        <ContactForm onAddContact={this.handleAddContact} />

        <Title>Contacts</Title>
        <ContactFilter
          filter={filter}
          onChangeFilter={this.handleChangeFilter}
        />
        <Contacts
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
          onDeleteAll={this.deleteAllContacts}
        />
      </div>
    );
  }
}
