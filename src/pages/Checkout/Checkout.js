import './Checkout.css'
import { useState } from 'react';

const handleSubmit = async (e, formData) => {
  e.preventDefault();

  try
  {
    //For deployment
    //const response = await fetch(`https://library-management-service.onrender.com/checkout`, {
        //For test
    const response = await fetch(`http://localhost:3001/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Form submitted successfully');
      // Handle success (e.g., show a success message)
      window.alert(`${JSON.stringify(response)} ${formData.firstName} added successfully`);
      window.location = '/';
    } else {
        const errorData = await response.json();
        console.error('Form submission failed:', errorData.error);
        window.alert(`Error: ${errorData.error}`);
        // Handle error (e.g., show an error message)
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

function Checkout() {
  const [formData, setFormData] = useState({});
  
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form className="checkoutForm" onSubmit={(e) => handleSubmit(e, formData)}>
        <div className="email">
          <label>User Email*</label>
          <input
            type="text"
            name="email"
            required
            onChange={(e) => handleChange(e, formData, setFormData)}
          />
        </div>
        <div className="isbn">
          <label>Book ISBN*</label>
          <input
            type="text"
            name="isbn"
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

export default Checkout;