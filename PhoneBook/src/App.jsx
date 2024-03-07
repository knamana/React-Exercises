import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  table: {
    borderCollapse: 'collapse',
    tableCell: {
      border: '1px solid gray',
      margin: 0,
      padding: '5px 10px',
      width: 'max-content',
      minWidth: '150px'
    }
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
};

function PhoneBookForm({ addEntryToPhoneBook }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    addEntryToPhoneBook({ firstName, lastName, phone });
    setFirstName('');
    setLastName('');
    setPhone('');
  }

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label><br />
      <input
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname'
        type='text'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      /><br />
      <label>Last name:</label><br />
      <input
        style={style.form.inputs}
        className='userLastname'
        name='userLastname'
        type='text'
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      /><br />
      <label>Phone:</label><br />
      <input
        style={style.form.inputs}
        className='userPhone'
        name='userPhone'
        type='text'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      /><br />
      <button
        style={style.form.submitBtn}
        className='submitButton'
        type='submit'
      >Add User</button>
    </form>
  );
}

function InformationTable({ phoneBook }) {
  return (
    <table style={style.table} className='informationTable'>
      <thead>
        <tr>
          <th style={style.table.tableCell}>First name</th>
          <th style={style.table.tableCell}>Last name</th>
          <th style={style.table.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {phoneBook.map((entry, index) => (
          <tr key={index}>
            <td style={style.table.tableCell}>{entry.firstName}</td>
            <td style={style.table.tableCell}>{entry.lastName}</td>
            <td style={style.table.tableCell}>{entry.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Application() {
  const [phoneBook, setPhoneBook] = useState([]);

  function addEntryToPhoneBook(entry) {
    const updatedPhoneBook = [...phoneBook, entry];
    updatedPhoneBook.sort((a, b) => a.lastName.localeCompare(b.lastName));
    setPhoneBook(updatedPhoneBook);
  }

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable phoneBook={phoneBook} />
    </section>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application />);
