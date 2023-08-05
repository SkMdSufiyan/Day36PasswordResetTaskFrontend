import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';


function App() {
  return (
    <div className="App">
    
      <p style={{color : "red", fontSize : "small", margin : "0px"}}>Kindly do not refresh this site when you are on a page other than the home page. </p>
      <p style={{color : "red", fontSize : "small", margin : "0px"}}> Otherwise, this Netlify deployment will give a "page not found" error.  </p>

      <br />


      <BrowserRouter>
      <Routes>
        {/* "Home" component displays the buttons for signup, login, forgot password */}
        <Route path="/" element={< Home />} />
        {/* For registering new user */}
        <Route path="/signup" element={< Signup />} />
        {/* For login */}
        <Route path="/login" element={< Login />} />
        {/* For sending the password reset link through email */}
        <Route path="/forgot-password" element={< ForgotPassword />} />
        {/* For resetting the password */}
        <Route path="/reset-password/:resetToken" element={< ResetPassword />} />
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
