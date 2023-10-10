import './AddUser.css'
import { useState } from 'react';

const handleSubmit = async (e, formData) => {
  e.preventDefault();

  try
  {
    const response = await fetch(`http://localhost:3001/add-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Form submitted successfully');
      // Handle success (e.g., show a success message)
      window.alert(`${formData.firstName} added successfully`);
      window.location = '/';
    } else {
      console.error('Form submission failed');
      // Handle error (e.g., show an error message)
    }
  }
  catch(error)
  {
    console.error('An error occurred', error);
  }
};

const handleChange = (e, formData, setFormData) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value});
};

function AddUser() {
  const [formData, setFormData] = useState({});
  
  return (
    <div className="add">
      <h1>Add User</h1>
      <form className="addUserForm" onSubmit={(e) => handleSubmit(e, formData)}>
        <div className="firsNamt">
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            required
            onChange={(e) => handleChange(e, formData, setFormData)}
          />
        </div>
        <div className="lastName">
          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            required
            onChange={(e) => handleChange(e, formData, setFormData)}
            />
          </div>
          <div className="email">
            <label>Email*</label>
            <input
              type="text"
              name="email"
              required
              onChange={(e) => handleChange(e, formData, setFormData)}
              />
          </div>
          <div className="required">
            <label>* Required</label>
          </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUser;