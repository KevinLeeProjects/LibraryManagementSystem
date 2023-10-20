import './AddBook.css'
import { useState } from 'react';

const handleSubmit = async (e, formData) => {
  e.preventDefault();

  try
  {
    //for deployment
    //const response = await fetch(`https://library-management-service.onrender.com/add-book`, {
      
    //for test
    const response = await fetch(`http://localhost:3001/add-book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Form submitted successfully');
      // Handle success (e.g., show a success message)
      window.alert(`${formData.title} added successfully`);
      window.location = '/';
    } else {
      console.error('Form submission failed');
      window.alert(`Book with ISBN ${formData.isbn} already exists`);
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

function AddBook() {
  const [formData, setFormData] = useState({});
  
  return (
    <div className="add">
      <h1>Add Book</h1>
      <form className="addBookForm" onSubmit={(e) => handleSubmit(e, formData)}>
        <div className="title">
          <label>Title*</label>
          <input
            type="text"
            name="title"
            required
            onChange={(e) => handleChange(e, formData, setFormData)}
          />
        </div>
        <div className="authorFirstName">
          <label>Author First Name*</label>
          <input
            type="text"
            name="authorFirstName"
            required
            onChange={(e) => handleChange(e, formData, setFormData)}
            />
          </div>
          <div className="authorMiddleName">
            <label>Author Middle Name</label>
            <input
              type="text"
              name="authorMiddleName"
              onChange={(e) => handleChange(e, formData, setFormData)}
              />
          </div>
          <div className="authorLastName">
            <label>Author Last Name*</label>
            <input
              type="text"
              name="authorLastName"
              required
              onChange={(e) => handleChange(e, formData, setFormData)}
              />
          </div>
          <div className="ISBN">
            <label>ISBN*</label>
            <input
              type="text"
              name="isbn"
              required
              onChange={(e) => handleChange(e, formData, setFormData)}
              />
          </div>
          <div className="numberOfCopies">
            <label>Number Of Copies*</label>
            <input
              type="number"
              name="numberOfCopies"
              required
              onChange={(e) => handleChange(e, formData, setFormData)}
              />
          </div>
          <div className="genres">
            <label>Genre(s)*</label>
            <input
              type="text"
              name="genres"
              required
              onChange={(e) => handleChange(e, formData, setFormData)}
              />
          </div>
          <div className="publicationYear">
            <label>Publication Year*</label>
            <input
              type="text"
              name="publicationYear"
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

export default AddBook;