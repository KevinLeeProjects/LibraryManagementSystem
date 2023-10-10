import { Link, Outlet } from "react-router-dom";
import './Layout.css';


function Layout() {
  const leftStyle = {
    float: "left"
  };
  console.log("Hi");
  return (   
    <div>
    <header className="App-header">
        <div className="main-page">
          <img src="https://basecamplive.com/wp-content/uploads/2023/02/books.jpeg" className="bookshelf-image" alt="Bbookshelf"/>
          <div className="nav">
            <ul>
              <li>
                <Link to="/all-transactions">All Transactions</Link>
              </li>
              <li>
                <Link to="/checkout">Check Out</Link>
              </li>
              <li>
                <Link to="/add-user">Add User</Link>
              </li>
              <li>
                <Link to="/get-user">Get User</Link>
              </li>
              <li>
                <Link to="/add-book">Add Book</Link>
              </li>
              <li>
                <Link to="/get-book">Get Book</Link>
              </li>
              <li style={leftStyle }>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <Outlet />
          </div>
        </div>
      </header>  
  </div>
  
  );
}

export default Layout;