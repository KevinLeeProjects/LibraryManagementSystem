import './Home.css';
import img from '../../Assets/KLLogo.png'

function Home() {
  console.log('home');
  return (
    <div>
      <h1>Library Management System</h1>
      <img src={img} className="KLLogo" alt="KLLogo"></img>
    </div>
  );
};

export default Home;