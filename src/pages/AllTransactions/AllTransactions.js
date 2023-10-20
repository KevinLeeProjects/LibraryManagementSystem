import './AllTransactions.css'
import { useState, useEffect  } from 'react';

const getTransactions = async (setLabel) => {
    try
    {
        //For deployment
        //const response = await fetch(`https://library-management-service.onrender.com/get-book?data=${encodeURIComponent(formData.data)}`, {
        const response = await fetch(`http://localhost:3001/all-transactions`, {
            method: 'GET'
        });
        let test = [];
        if (response.ok) {
            const data = await response.json();
            for(const keys in data)
            {
                console.log(data[keys]);
                test.push(data[keys]);
            }
            console.log(`Hello ${test}`);
            setLabel(test);
        } else {
            console.error('Form submission failed');
            setLabel(["Failed"]);
        }
    }
    catch(error)
    {
      console.error('An error occurred', error);
      setLabel(["No Transactions"]);
    }
};

function AllTransactions() 
{
    const [label, setLabel] = useState([]);

    useEffect(() => {
        // This code will run when the component mounts
        getTransactions(setLabel);
    }, []);

    return(
        <div className="getTransactionsPage">
            <h1>All Transactions</h1>
            {label.length > 1 && (
                <div>
                <table>
                    <tr>
                        <th>ISBN</th>
                        <th>User ID</th>
                        <th>Date Checked Out</th>
                        <th>Date Returned</th>
                    </tr>
                    
                    {label.map((item, index) => {
                        return(
                            <tr>
                            <td>{JSON.stringify(item["isbn"])}</td> 
                            <td>{JSON.stringify(item["user_id"])}</td> 
                            <td>{JSON.stringify(item["date_checked_out"])}</td> 
                            <td>{JSON.stringify(item["date_returned"])}</td> 
                            </tr>
                        )
                })}
                
                </table>
                
            </div>
            )}
            {label.length === 1 && <p>{label[0]}</p>}
        </div>
    );
}

export default AllTransactions;