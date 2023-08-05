import React, { useState } from 'react';
import { Button, Label, Card, Input, CardBody } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import validator from "validator";
import axios from "axios";

// This component displays the signup page
const Signup = () => {

    const serverUrl = process.env.REACT_APP_SERVER_BASE_URL; // Server URL
    const navigate = useNavigate();

    const emptySignupFormData = {
        "name" : "",
        "email" : "",
        "password" : "",
        "city" : "",
        "country" : ""
    };

    const emptySignupFormErrors = {
        "nameError" : "",
        "emailError" : "",
        "passwordError" : "",
        "cityError" : "",
        "countryError" : ""
    }

    // Initializing the states
    const [signupFormData, setSignupFormData] = useState(emptySignupFormData);
    const [signupFormErrors, setSignupFormErrors] = useState(emptySignupFormErrors);
    // "isAllValidData" will be true if all the mandatory fields are filled and validated
    // If "isAllValidData" is true, then the submit button will be enabled
    const [isAllValidData, setIsAllValidData] = useState(false);

    // "isSignupSuccess" will be true if the user registration is successfull
    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    // "apiCallError" contains any errors occured during api calls or in try-catch
    const [apiCallError, setApiCallError] = useState("");


    // Function for making a post request to add a new user
    const addNewUserFun = async (signupFormData) => {
        try{
            await axios.post(`${serverUrl}/api/signup`, signupFormData)
                .then(result => {
                    setIsSignupSuccess(true);
                    setSignupFormData(emptySignupFormData);
                    setApiCallError("");
                })
                .catch(err => {
                    setApiCallError(err.response.data.message);
                    setIsSignupSuccess(false);
                })
        }catch(error){
            setApiCallError(error.message);
            setIsSignupSuccess(false);
        }
    }


    // Function for handling the input field changes
    const handleSignupFormChange = (e) => {
        setSignupFormData({...signupFormData, [e.target.name] : e.target.value.trim()});

        // Validating name field
        if(e.target.name === "name"){
            if(validator.isLength(e.target.value.trim(), {"min" : 3}) && ! validator.isEmpty(e.target.value)){
                setSignupFormErrors({...signupFormErrors, "nameError" : "" });
            }else{
                setSignupFormErrors({...signupFormErrors, "nameError" : "Should contain minimum 3 characters"});
            }
        }

        // Validating email field
        if(e.target.name === "email"){
            if(validator.isEmail(e.target.value)){
                setSignupFormErrors({...signupFormErrors, "emailError" : ""});
            }else{
                setSignupFormErrors({...signupFormErrors, "emailError" : "Enter a valid email id"});
            }
        }

        // Validating password field
        if(e.target.name === "password"){
            if(validator.isLength(e.target.value.trim(), {"min" : 8}) && ! validator.isEmpty(e.target.value)){
                setSignupFormErrors({...signupFormErrors, "passwordError" : ""});
            }else{
                setSignupFormErrors({...signupFormErrors, "passwordError" : "Should contain minimum 8 characters"});
            }
        }

        // Validating city field
        if(e.target.name === "city"){
            if(validator.isEmpty(e.target.value)){
                setSignupFormErrors({...signupFormErrors, "cityError" : "City is required"});
            }else{
                setSignupFormErrors({...signupFormErrors, "cityError" : "" });
            }
        }

        // Validating country field
        if(e.target.name === "country"){
            if(validator.isEmpty(e.target.value)){
                setSignupFormErrors({...signupFormErrors, "countryError" : "Country is required"});
            }else{
                setSignupFormErrors({...signupFormErrors, "countryError" : "" });
            }
        }


        // Checking whether any of the mandatory input fields is empty (not filled)
        const emptyInputFields = Object.values(signupFormData).filter(val=>val === "").length;
        // Checking whether any of the fields of "signupFormErrors" contains error value
        const errorsInTheForm = Object.values(signupFormErrors).filter(val=>val !== "").length;

        // Changing the state of "isAllValidData"
        if( ! emptyInputFields && ! errorsInTheForm ){
            setIsAllValidData(true);  
        }else{
            setIsAllValidData(false);
        }

    }

    //  Function for handling the onClick event of submit button (form submission)
    const handleSubmitSignupForm = (e) => {
        e.preventDefault();
        addNewUserFun(signupFormData);
    }


  return (
    <div className='component-main-div'>
        { ! isSignupSuccess ? (
            // If the signup is not successful yet
            // Showing the signup form
            <Card style={{width: '18rem'}}>
                <CardBody>
                    <div className='signup-login-link-but-div'>
                        <button className='login-link-but' onClick={()=>navigate('/login')}>Login</button>
                    </div>
                    <p className='blue-color-p-class'>Signup</p>
                    {/* Showing the "apiCallError", if any error occurs */}
                    <h6 className='apiCallError-h6-class'>{apiCallError}</h6>

                    {/* Signup form */}
                    <Label>Name</Label><span>*</span>
                    <Input type='text' placeholder='Enter name' name='name' value={signupFormData.name} onChange={handleSignupFormChange} />
                    <span>{signupFormErrors.nameError ? signupFormErrors.nameError : "" } </span>
                    <br />
                    
                    <Label>Email</Label><span>*</span>
                    <Input type='text' placeholder='Enter email' name='email' value={signupFormData.email} onChange={handleSignupFormChange} />
                    <span>{signupFormErrors.emailError ? signupFormErrors.emailError : "" } </span>
                    <br />
                    
                    <Label>Password</Label><span>*</span>
                    <Input type='password' placeholder='Enter password' name='password' value={signupFormData.password} onChange={handleSignupFormChange} />
                    <span>{signupFormErrors.passwordError ? signupFormErrors.passwordError : "" } </span>
                    <br />
                    
                    <Label>City</Label><span>*</span>
                    <Input type='text' placeholder='Enter city' name='city' value={signupFormData.city} onChange={handleSignupFormChange} />
                    <br />
                    
                    <Label>Country</Label><span>*</span>
                    <Input type='text' placeholder='Enter country' name='country' value={signupFormData.country} onChange={handleSignupFormChange} />
                    <br />

                    <Button className='Button-class' color='success' disabled={! isAllValidData} onClick={handleSubmitSignupForm}>Submit</Button>
                    <Button className='Button-class' color='warning' onClick={()=>navigate('/')}>Cancel</Button>
                </CardBody>
            </Card>     
        ) : "" }  


        { isSignupSuccess ? (
            // If the signup form is submitted and the user is registered successfully
            <Card style={{width: '18rem'}}>
                <CardBody>
                    <h6 className='apiCallSuccess-h6-class'>Signup successful</h6>
                    <br />
                    <br />
                    <Button color='primary' onClick={()=>navigate('/login')}>Login</Button>
                </CardBody>
            </Card>
        ) : "" }

             
    </div>
  )
}

export default Signup







