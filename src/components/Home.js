import React from 'react';
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from 'react-router-dom';

// This component displays the home page of this application
const Home = () => {
    const navigate = useNavigate();

  return (
    <div className='component-main-div'>
        <h6 style={{color: "blue"}}>Welcome to users application </h6>
        <p className='blue-color-p-class'>(signup, login, reset password)</p>
        

        <Card style={{width : "18rem"}} >
            <CardBody>
              {/* Buttons to perform the actions */}
                <Button className='home-page-Button-class' color='primary' onClick={() => navigate('/login')}>Login</Button>
                <Button className='home-page-Button-class' color='info' onClick={()=>navigate('/signup')}>Signup</Button>
                <br />
                <Button className='home-page-Button-class' onClick={()=>navigate('/forgot-password')}>Forgot password?</Button>

            </CardBody>
        </Card>

    </div>
  )
}

export default Home

