import './GetUser.css'
import { useState } from 'react';

const handleSubmit = async (e, formData, setLabel) => {
    e.preventDefault();
  
    try
    {
        const response = await fetch(`http://localhost:3001/get-user?email=${encodeURIComponent(formData.email)}`, {
            method: 'GET'
        });
        let test = [];
        if (response.ok) {
            const data = await response.json();
            for(const keys in data)
            {
                test.push(data[keys]);
            }
            setLabel(test);
        } else {
            console.error('Form submission failed');
            setLabel(["Failed"]);
        }
    }
    catch(error)
    {
      console.error('An error occurred', error);
      setLabel(["User doesn't exist"]);
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
        <div className="getUserPage">
            <h1>Get User</h1>
            <form className="getUserForm" onSubmit={(e) => handleSubmit(e, formData, setLabel)}>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    onChange={(e) => handleChange(e, formData, setFormData)}
                />
                <button type="submit">Submit</button>
            </form>
            
            {label.length > 1 && (
                <div>
                <table>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Current Books</th>
                        <th>All Books</th>
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