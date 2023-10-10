import './GetBook.css'
import { useState } from 'react';

const handleSubmit = async (e, formData) => {
    e.preventDefault();
  
    try
    {
        console.log(formData);
    //   const response = await fetch(`http://localhost:3001/get-book/`, {
    //     method: 'GET'
    //   });
  
    //   if (response.ok) {
    //     console.log('Form submitted successfully');
    //     // Handle success (e.g., show a success message)
    //   } else {
    //     console.error('Form submission failed');
    //     // Handle error (e.g., show an error message)
    //   }
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

function GetBook(){
    const [formData, setFormData] = useState({});

    return(
        <div className="getBookPage">
            <h1>Get Book</h1>
            <form onSubmit={(e) => handleSubmit(e, formData)}>
                <label>ISBN or Book Title</label>
                <input
                    type="text"
                    name="data"
                    onChange={(e) => handleChange(e, formData, setFormData)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default GetBook;