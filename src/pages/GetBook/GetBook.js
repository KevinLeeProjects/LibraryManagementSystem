import './GetBook.css'
import { useState } from 'react';

const handleSubmit = async (e, formData, setLabel) => {
    e.preventDefault();
  
    try
    {
        //For deployment
        //const response = await fetch(`https://library-management-service.onrender.com/get-book?data=${encodeURIComponent(formData.data)}`, {
        const response = await fetch(`http://localhost:3001/get-book?data=${encodeURIComponent(formData.data)}`, {
            method: 'GET'
        });
        let test = [];
        if (response.ok) {
            const data = await response.json();
            for(const keys in data)
            {
                test.push(data[keys]);
            }
            console.log(`Hello ${test[2]}`);
            setLabel(test);
        } else {
            console.error('Form submission failed');
            setLabel(["Failed"]);
        }
    }
    catch(error)
    {
      console.error('An error occurred', error);
      setLabel(["Book/author doesn't exist"]);
    }
};

const handleChange = (e, formData, setFormData) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
};

function GetBook(){
    const [formData, setFormData] = useState({});
    const [label, setLabel] = useState([]);

    return(
        <div className="getBookPage">
            <h1>Get Book</h1>
            <form className="getBookForm" onSubmit={(e) => handleSubmit(e, formData, setLabel)}>
                <label>ISBN/Book Title/Author Name</label>
                <input
                    type="text"
                    name="data"
                    onChange={(e) => handleChange(e, formData, setFormData)}
                />
                <button type="submit">Submit</button>
            </form>
            
            {label.length > 1 && (
                <div>
                <table>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genres</th>
                        <th>Publication Year</th>
                        <th>Copies Available</th>
                        <th>Transaction History</th>
                    </tr>
                    <tr>
                    {label.map((item, index) => {
                        return(
                            <td>{JSON.stringify(item)}</td> 
                        )
                })}
                </tr>
                </table>
                
            </div>
            )}
            {label.length === 1 && <p>{label[0]}</p>}
        </div>
    );
};

export default GetBook;