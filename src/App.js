import './App.css';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddBook from './pages/AddBook/AddBook';
import Home from './pages/Home/Home';
import Layout from './pages/Layout/Layout';
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route path="/" element={<Home />} />
              {/* <Route path="/get-user" element={<GetBook />} /> */}
              <Route path="/add-book" element={<AddBook />} />
              
            </Route>
          </Routes>
        </BrowserRouter>
       </div>
  );
}

//For deployment
//axios.get('https://library-management-service.onrender.com/public')
// axios.get('http://localhost:3001/public')
//   .then(response => {
//     // Handle the response data
//     console.log(response.data.message);
//   })
//   .catch(error => {
//     // Handle any errors
//   });

 export default App;
