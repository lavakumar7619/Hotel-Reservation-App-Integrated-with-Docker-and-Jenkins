import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { AuthContext } from "../../context/AuthContext";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FaHotel } from "react-icons/fa"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { AppBar, Toolbar, IconButton, Typography, Stack, Menu, MenuItem } from '@mui/material';
import Error from "../../utils/Error"
import useErrorDisplay from '../../hooks/useErrorDisplay';
function BasicExample() {
   
    const { user ,dispatch} = useContext(AuthContext);
    const navigate = useNavigate()
    const {Handelalert,seterror,open,setopen,error:err}=useErrorDisplay()
    const { data: profile, loading, reFetch } = useFetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}`);

    const [data, setdata] = useState({
        username: profile.username,
        password: profile.password,
        email: profile.email,
        phone: profile.phone,
        country: profile.country,
        city: profile.city,
        img: profile.img,
    });
    const [show, setShow] = useState(false);
    const [files, setFiles] = useState("");

    const handleChange = (e) => {
        setdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    const handleClick = async (e) => {
        e.preventDefault();


        // if((data.username.length && data.email.length && data.phone.length<10 && data.country.length && data.city.length && data.password.length>4) <1) {
        //   alert("Fill all the details");
        //   navigate("/register")
        //   return
        // }
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {

                    const data1 = new FormData();
                    data1.append("file", file);
                    data1.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/dzrbcb2gv/image/upload",
                        data1
                    );
                    //take url from drive
                    const { url } = uploadRes.data;
                    return url;
                })
            );
            const upadted_user = {
                ...data,
                img: list[0],
            };
            fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    data: upadted_user
                })
            })
                .then(res => { return res.json() })
                .then(data3 => {
                    if (data3.updated === true) {
                        reFetch()
                        Handelalert("Updated Succesfuly")
                    }
                })
        } catch (err) {
            Handelalert("Unable to update profile..try again..!")
            reFetch()
            setShow(true)
        }
    };
    const handelLogout=async(e)=>{
        try {
            const loged_out=await axios.get(`${process.env.REACT_APP_BASE_URL}/user/auth/logout`)
            console.log(loged_out);
            dispatch({ type: "LOGOUT" });
            navigate("/login")
        } catch (error) {
            Handelalert("Failed To logout")
        }
    }
    return (
        <>  
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
                   
                   {/* {user &&  <Button color='inherit' onClick={(e) => navigate('/about')}>About Us</Button>  }                                      */}
                   <Button color='inherit' disabled={user===null} onClick={(e) => navigate('/about')}>About Us</Button> 
                        {user.isAdmin && (
                            <Button color='inherit' onClick={(e) => navigate('/admin/dash')}> DashBoard</Button>
                        ) }
                    {!user.isAdmin &&  <Button color='inherit' onClick={(e) => navigate('/bookings')}> Bookings</Button>}
                       {!user ? (<Button color='inherit' onClick={(e) => navigate("/login")} > Login</Button>) : (<Button color='error' onClick={handelLogout} > Logout</Button>)}
                       {profile.img ? (
                                <Figure.Image
                                    roundedCircle
                                    width={35}
                                    height={40}
                                    alt="171x180"
                                    src={profile.img}
                                    style={{ cursor: "pointer" }}
                                    onClick={handleShow}
                                    className="mt-2 ml-2 "
                                />
                            ) : (
                                <Figure.Image
                                    roundedCircle
                                    width={35}
                                    height={40}
                                    alt="171x180"
                                    src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleShow}
                                    className="mt-2 ml-2 "
                                />
                            )}
                
                    </Stack>
                </Toolbar>
            </AppBar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title className="justify-content-md-center">
                        {profile.img ? (
                            <Figure.Image
                                roundedCircle
                                width={55}
                                height={50}
                                alt="171x180"
                                src={profile.img}
                                style={{ cursor: "pointer" }}
                                onClick={handleShow}
                                className="mt-2 ml-2 "
                            />
                        ) : (
                            <Figure.Image
                                roundedCircle
                                width={50}
                                height={50}
                                alt="171x180"
                                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                style={{ cursor: "pointer" }}
                                onClick={handleShow}
                                className="mt-2 ml-2 "
                            />
                        )}
                        <span> {profile.username}</span>
                    </Modal.Title>
                </Modal.Header>
                <Container>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-2" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    id="username"
                                    type="name"
                                    placeholder={profile.username}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    id="email"
                                    type="email"
                                    placeholder={profile.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Row>
                                {/* <Col>
                                    <Form.Group className="mb-2" >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            id="password"
                                            type="type"
                                            placeholder={profile.password}

                                        />
                                        <Form.Check type="checkbox" label="Show Password" />
                                    </Form.Group>
                                </Col> */}
                                <Col>
                                    <Form.Group className="mb-2" id="phone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder={profile.phone}
                                            autoFocus
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-2" >
                                        <Form.Label>City</Form.Label>
                                        <Form.Control
                                            id="city"
                                            type="text"
                                            placeholder={profile.city}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-2" >
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control
                                            id="country"
                                            type="text"
                                            placeholder={profile.country}
                                            onChange={handleChange}
                                        />

                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-2" >
                                <Form.Label htmlFor="file">
                                    Change Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </Form.Label>
                                <Form.Control
                                    // filename={files}
                                    id="file"
                                    onChange={e => setFiles(e.target.files)}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />

                            </Form.Group>
                        </Form>
                    </Modal.Body>
                </Container>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="danger" >
                        Close
                    </Button>
                    <Button variant="info" onClick={handleClick}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BasicExample;