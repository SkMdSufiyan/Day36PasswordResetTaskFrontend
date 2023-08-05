import React, { useState } from 'react';
import { Button, Label, Card, Input, CardBody } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import validator from "validator";


const Login = () => {
  const serverUrl = process.env.REACT_APP_SERVER_BASE_URL; // Server URL
  const navigate = useNavigate();

  const emptyLoginFormData = {
    "email" : "",
    "password" : ""
  };

  const emptyLoginFormErrors = {
    "emailError" : ""
  }

   // Initializing the states
  const [loginFormData, setLoginFormData] = useState(emptyLoginFormData);
  const [loginFormErrors, setLoginFormErrors] = useState(emptyLoginFormErrors);
  const [disableSubmit, setDisableSubmit] = useState(true);
   
  // "isLoginSuccess" will be true if the user is logged in successfully
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  // "apiCallError" contains any errors occured during api calls or in try-catch
  const [apiCallError, setApiCallError] = useState("");
 
  // "isLoggedOut" will be initially true, and will be false after the user logged in successfully, and will be again true once the user is logged out successfully
  const [isLoggedOut, setIsLoggedOut] = useState(true);
  // "userProfile" will have the user profile data once the user is logged in successfully
  const [userProfile, setUserProfile] = useState({});
  // "isProfileClicked" will be true if the user clicks "Profile" button after logging in successfully
  const [isProfileClicked, setIsProfileClicked] = useState(false);

// Function for making a POST call for login
  const loginUserFun = async (loginFormData) => {
    try{
      await axios.post(`${serverUrl}/api/login`, loginFormData)
          .then(res => {
              setIsLoginSuccess(true);
              setLoginFormData(emptyLoginFormData);
              setApiCallError("");
              setIsLoggedOut(false);
              setUserProfile(res.data.userProfile);
          })
          .catch(err => {
              setApiCallError(err.response.data.message);
              setIsLoginSuccess(false);
              setIsLoggedOut(true);
          })
    }catch(error){
      setApiCallError(error.message);
      setIsLoginSuccess(false);
      setIsLoggedOut(true);
    }
  }


  // Function for making a GET call for logout
  const logoutUserFun = async () => {
    try{
      await axios.get(`${serverUrl}/api/logout`)
      .then(res => {
        setIsLoggedOut(true);  
        setApiCallError("");
      })
      .catch(err => {
        setApiCallError(err.response.data.message);
        setIsLoggedOut(false);
      })
    }catch(error){
      setApiCallError(error.message);
    }
  }

// Function for handling the input field changes
  const handleLoginFormChange = (e) => {
    setLoginFormData({...loginFormData, [e.target.name] : e.target.value.trim()});

    if(e.target.name === "email"){
      if(validator.isEmail(e.target.value.trim())){
        setLoginFormErrors({...loginFormErrors, "emailError" : ""});
      }else{
        setLoginFormErrors({...loginFormErrors, "emailError" : "Enter valid email" });
      }
    }

     // Checking whether any of the mandatory input fields is empty (not filled)
    const emptyInputFields = Object.values(loginFormData).filter(val => val === "" ).length;
    // Checking whether any of the fields of "loginFormErrors" contains error value
    const errorsInTheForm = Object.values(loginFormErrors).filter(val => val !== "" ).length;

    // Changing the state of "disableSubmit"
    if( ! emptyInputFields && ! errorsInTheForm ){
      setDisableSubmit(false);
    }else{
      setDisableSubmit(true);
    }
  }

  // Function for handling the onClick event of submit button (form submission)
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    loginUserFun(loginFormData);       
  }



  return (
    <div className='component-main-div'>
      
      { ! isLoginSuccess && isLoggedOut ? (
        // If "isLoginSuccess" is false and "isLoggedOut" is true
        // i.e. when the login page is just loaded (showing the login form)
            <Card style={{width: '18rem'}}>
                <CardBody>
                  <div className='signup-login-link-but-div'>
                    <button className='signup-link-but' onClick={()=>navigate('/signup')}>Signup</button>
                  </div>
                    <p className='blue-color-p-class'>Login</p>
                    {/* Showing the "apiCallError", if any error occurs */}
                    <h6 className='apiCallError-h6-class'>{apiCallError}</h6>


                    <Label >Username (email id)</Label>
                    <Input type="text" name='email' placeholder='Enter email' value={loginFormData.email} onChange={handleLoginFormChange} />
                    <span>{loginFormErrors.emailError}</span>

                    <br />
                    <Label>Password</Label>
                    <Input type="password" name='password' placeholder='Enter password' value={loginFormData.password} onChange={handleLoginFormChange} />
                    <br />

                    <Button className='Button-class' color='success' disabled={disableSubmit} onClick={handleSubmitLogin}>Submit</Button>
                    <Button className='Button-class' color='warning' onClick={()=>navigate('/')}>Cancel</Button>
                    <button className='forgot-pw-link-but' onClick={()=>navigate('/forgot-password')}>Forgot password?</button>
                </CardBody>
            </Card>
        ) : "" }


        {isLoginSuccess && ! isLoggedOut  ? (
          // If "isLoginSuccess" is true and "isLoggedOut" is false
          // i.e. when the user is logged in successfully (and not logged out yet)
          // Showing the profile and logout button
            <Card style={{width: '18rem'}}>
              <CardBody>
                    <h6 className='apiCallSuccess-h6-class'>Login successful</h6>
                    <h6 className='apiCallError-h6-class'>{apiCallError}</h6>
                    <br />                    
                    <div>
                      <Button className='Button-class' color='primary' onClick={() => setIsProfileClicked(true)}>Profile</Button>
                    </div>
                        {isProfileClicked ? (
                          // If the user clicked the "Profile" button
                          // Showing the user profile
                          <div className='profile-div'>
                            <Label>Name</Label>
                            <Input value={userProfile.name} disabled={true} />
                            <Label>Email</Label>
                            <Input value={userProfile.email} disabled={true} />
                            <Label>Id</Label>
                            <Input value={userProfile._id} disabled={true} />
                            <Label>City</Label>
                            <Input value={userProfile.city} disabled={true} />
                            <Label>Country</Label>
                            <Input value={userProfile.country} disabled={true} />
                          </div>
                        ) : "" }

                    <Button className='Button-class' color='warning' onClick={logoutUserFun}>Logout</Button>
              </CardBody>
            </Card>
        ) : "" }


        {isLoginSuccess && isLoggedOut  ? (
          // If the "isLoginSuccess" is true and "isLoggedOut" is true
          // i.e. when the user is logged out (logged in once and then logged out)
          // Shwing the successful logged out message
            <Card style={{width: '18rem'}}>
              <CardBody>
                <h6 className='apiCallSuccess-h6-class'>Logged out successfully</h6>
                <br />
                <br />
                <Button color='warning' onClick={()=>{setIsLoginSuccess(false); navigate('/login')}}>Login</Button> 
              </CardBody>
            </Card>
          ) : "" }

        
    </div>
  )
}

export default Login

