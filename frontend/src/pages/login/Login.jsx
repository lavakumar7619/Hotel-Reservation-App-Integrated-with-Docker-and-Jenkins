import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';
import { AppBar, Toolbar, IconButton, Typography, Stack, Menu, MenuItem } from '@mui/material';
import "../../pages/login/signup.css"
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import { FaHotel } from "react-icons/fa"
import Row from 'react-bootstrap/Row';
import Tabs from 'react-bootstrap/Tabs';
import OTPInput, { ResendOTP } from "otp-input-react";
import Button from 'react-bootstrap/Button';
import useErrorDisplay from "../../hooks/useErrorDisplay";
import Error from "../../utils/Error";
const Login = () => {
  const { Handelalert, seterror, open, setopen, error: err } = useErrorDisplay()
  const [OTP, setOTP] = useState("");
  const [key, setKey] = useState('OTP');
  const [PhoneNumber, setPhoneNumber] = useState(0)
  const [loadSend, setloadSend] = useState(false)
  const [credentials, setCredentials] = useState({
    phone: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if( (credentials.phone.length != 10) ) {
      Handelalert("Check entered phone number");
      navigate("/login")
      return
    }
    if( (credentials.password.length <3) ) {
      Handelalert("Check entered password");
      navigate("/login")
      return
    }
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("http://localhost:5000/user/auth/login", credentials);
      //const cookie=await axios.get("http://localhost:5000/setCookies")
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details,token:res.data.token });
      Handelalert("Succesful Login")
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      Handelalert("Login Failure");
    }

  };
  const [data, setdata] = useState({
    username: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    password: "",
  });

  const handleChange2 = (e) => {
    setdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const showPassword=(e)=>{
    if(e.target.getAttribute("type")==="password"){
      e.target.setAttribute("type","text")
    }
    else{
      e.target.setAttribute("type","password")
    }
  }
  const handleClick2 = async (e) => {
    e.preventDefault();

    // if((data.username.length<0 && data.phone.length !=10 && data.country.length<0 && data.city.length<0 && data.password.length<5) <1) {
    //   Handelalert("Fill all the details");
    //   navigate("/login")
    //   return
    // }
    if(data.username.length <0) return Handelalert("Fill User name");
    //if(data.phone.length <10) return Handelalert("Fill all the details");
    if(data.country.length <0) return Handelalert("Fill Country");
    if(data.city.length <0) return Handelalert("Fill City");

    if(data.password.length <=4) return alert("password length should be min 5")
    try {
      fetch('http://localhost:5000/user/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          data: data
        })
      })
        .then(res => { return res.json() })
        .then(data => {
          Handelalert(data.info)
          setKey("OTP")
        })
    } catch (err) {
      Handelalert("failed to register");

    }
  };

  const handleSendOTP = async (e) => {
    try {
      if (PhoneNumber.length !=10) return Handelalert("Enter valid Phone number")
      const SendOTP = await axios.post(`http://localhost:5000/user/auth/sendOTP`, { PhoneNumber: PhoneNumber })
      console.log(SendOTP.data);
      Handelalert(SendOTP.data);
      setloadSend(true)
    } catch (error) {
      console.log(error);
      Handelalert("something went wrong")
    }
  }

  const handleVerify = async (e) => {
    if (!(OTP.length === 4)) {
      alert("enter 4 digits")
      setOTP("")
      return
    }
    try {
      const verifyOTP = await axios.post(`http://localhost:5000/user/auth/verifyOTP`, { OTP: OTP })
      if (verifyOTP.data === "Wrong OTP") {
        setOTP("")
        setloadSend(false)
        Handelalert(verifyOTP.data)
        return
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: verifyOTP.data.details ,token: verifyOTP.data.token });
      Handelalert("succesful login")
      navigate("/")
    } catch (error) {
      Handelalert("failied..try again")
    }
  }

  return (
    <div >
      <Error message={err} setopen={setopen} open={open} />
      <AppBar className='me-1'color='error' position='static'>
                <Toolbar>
                    <IconButton onClick={(e) => navigate('/')} size='large' edge='start' aria-label='logo'>
                        <FaHotel  className='m-2' />
                    </IconButton>
                    <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
                        Book Karo
                    </Typography>
                    <Stack direction='row' spacing={2}>   
                    <Button color='inherit' onClick={(e) => navigate('/about')}>About Us</Button>                                       
                    </Stack>
                </Toolbar>
            </AppBar>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        justify
      >
        <Tab eventKey="password" title="With Password">
          <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'
            style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', height: "600px" }}>
            <MDBCard className='m-4' style={{ maxWidth: "600px" }}>
              <MDBCardBody className='px-5'>
                <MDBInput wrapperClass='mb-4' label='Phone Number' size='lg' id='phone' type='number' onChange={handleChange} />
                <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='password' onClick={showPassword} type='text' onChange={handleChange} />
                {/* <MDBBtn
                  className='lButton  mb-2 w-100 gradient-custom-4' size='lg'
                  disabled={loading} onClick={handleClick}>Login
                </MDBBtn> */}
                <Button 
                  className='lButton  mb-2 w-100 gradient-custom-4' size='lg'
                  disabled={loading} onClick={handleClick}
                  variant="success">Login</Button>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </Tab>
        <Tab eventKey="OTP" title="With OTP">
          <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'
            style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)', height: "600px" }}>
            <MDBCard className='m-4' style={{ maxWidth: "600px" }}>
              <MDBCardBody className='px-4'>
                <label className='p-2'>Phone Number :</label>
                <MDBInput wrapperClass='mb-2' onChange={(e) => setPhoneNumber(e.target.value)} size='lg' id='phone' type='number' />
                <MDBBtn
                  className='lButton w-100 gradient-custom-4' size='md'
                  onClick={handleSendOTP}>Send OTP
                </MDBBtn>
              </MDBCardBody>
              {loadSend &&
                <MDBCardBody className='px-4 m-2'>
                  <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
                  <ResendOTP className='m-2 w-100' variant="info" size='md' maxTime={120} disabled onResendClick={handleSendOTP} />
                  <Button variant="outline-success" size='lg' onClick={handleVerify}>Verify</Button>
                </MDBCardBody>
              }
            </MDBCard>
          </MDBContainer>
        </Tab>
        <Tab eventKey="register" title="Register">
          <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'
            style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)' }}>
            <MDBCard className='m-2' style={{ maxWidth: "600px" }}>
              <MDBCardBody className='px-4'>
                <h2 className="text-uppercase text-center mb-5">Create an account </h2>
                <MDBInput wrapperClass='mb-2' label='Username' size='lg' id='username' type='text' onChange={handleChange2} />
                <MDBInput wrapperClass='mb-2' label='Email' size='lg' id='email' type='email' onChange={handleChange2} />
                <MDBInput wrapperClass='mb-2' label='Phone Number' size='lg' id='phone' type='number' onChange={handleChange2} />
                <Row>
                  <Col>
                    <MDBInput wrapperClass='mb-2' label='Country' size='lg' id='country' type='text' onChange={handleChange2} />
                  </Col>
                  <Col>
                    <MDBInput wrapperClass='mb-2' label='City' size='lg' id='city' type='text' onChange={handleChange2} />
                  </Col>
                </Row>
                <MDBInput wrapperClass='mb-2' label='Password' size='lg' id='password' onClick={showPassword} type='password' onChange={handleChange2} />
                
                <MDBBtn className='mb-2 w-100 gradient-custom-4' size='lg' onClick={handleClick2}>Register</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBContainer>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Login;
