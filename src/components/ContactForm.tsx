import React, { FC, ChangeEvent, useState} from 'react';
import { Action, Contact } from '../types';
import { Button, Form } from 'react-bootstrap';

interface ContactFormProps {
  dispatch: React.Dispatch<Action>;
  dataToEdit: Contact | undefined;
  toggleModal: () => void;
}

const ContactForm: FC<ContactFormProps> = ({  dispatch, dataToEdit, toggleModal}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [contact, setContact] = useState({
    firstName: dataToEdit?.firstName ? dataToEdit.firstName : '',
    lastName:  dataToEdit?.lastName ? dataToEdit.lastName : '',
    phoneNumber: dataToEdit?.phoneNumber ? dataToEdit.phoneNumber : '',
    email:   dataToEdit?.email ? dataToEdit.email : '',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {firstName, lastName, phoneNumber, email} = contact;
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      phoneNumber.trim() === ''||
      email.trim() === ''
    ) {
      setErrorMessage('All the fields are required.');
      return;
    } else if (phoneNumber.length < 3) {
      setErrorMessage('Please enter a phone number with more than 3 numbers.');
      return;
    }
    if (!dataToEdit) {
      dispatch({
        type: 'ADD_CONTACT',
        payload: {
          id: Date.now(),
          ...contact
        }
      });
      setContact({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
      });
      setErrorMessage('');
    } else {
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: {
          id: dataToEdit.id,
          updates: {
            id: Date.now(),
            ...contact
          }
        }
      });
      toggleModal();
    }
  };

  return (
    <Form onSubmit={handleOnSubmit} className="contact-form">
      <h3 className="mb-3">Add New Contact</h3>
      {errorMessage && <p className='errorMsg'>{errorMessage}</p>}
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          name="firstName"
          value={contact.firstName}
          type="text"
          placeholder="Enter first name"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          name="lastName"
          value={contact.lastName}
          type="text"
          placeholder="Enter last name"
          onChange={handleOnChange}
        />
      </Form.Group>
      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          name="phoneNumber"
          value={contact.phoneNumber}
          type="text"
          placeholder="Enter phone number"
          onChange={handleOnChange}
        />
         <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          value={contact.email}
          type="email"
          placeholder="Enter email"
          onChange={handleOnChange}
        />
      </Form.Group>
      </Form.Group>
     
  <div className="d-flex justify-content-end">
<Button variant='primary' type='submit' className='submit-btn'>
  {dataToEdit ? 'Update Contact' : 'Add Contact'}
</Button>
      </div>
    </Form>
  );
};

export default ContactForm;
