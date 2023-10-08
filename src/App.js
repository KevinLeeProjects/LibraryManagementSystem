import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="System to manage books, authors, transactions, and everyting else a library may need" />
        <title>Library Management System</title>
      </Helmet>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

axios.get('http://localhost:3001/public')
  .then(response => {
    // Handle the response data
    console.log(response.data.message);
  })
  .catch(error => {
    // Handle any errors
  });

export default App;
