export interface Contact {
  id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  }
  
  export interface Update {
    id: number;
    updates?: Contact;
  }

  export interface Action {
    type: 'ADD_CONTACT' | 'UPDATE_CONTACT' | 'DELETE_CONTACT'
    payload: Contact | Update;
  }
