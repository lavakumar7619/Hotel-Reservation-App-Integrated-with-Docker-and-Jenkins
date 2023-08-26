import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useContext, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Figure from 'react-bootstrap/Figure';
import useFetch from "../../hooks/useFetch";
import useErrorDisplay from "../../hooks/useErrorDisplay";
import { AuthContext } from "../../context/AuthContext";
import Error from "../../utils/Error";
import {RiUserStarFill,RiUserFill} from "react-icons/ri"
const UsersTable =() => {
  const { user:checkUser ,dispatch} = useContext(AuthContext);
  const navigate = useNavigate()
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5000/user/all`
  );
  
  const [show, setShow] = useState(false);
  const [person,setperson]=useState()
  const handleClose = () => setShow(false);
  const {Handelalert,seterror,open,setopen,error:err}=useErrorDisplay()
  const handelChange = async (e) => {
    const personid = e.target.parentElement.id
   if(e.target.name === "delete"){
    const deleted = await axios.delete(`http://localhost:5000/user/${personid}`,
    {
      headers:{
          authorization:sessionStorage.getItem("token")
      }
     });
    Handelalert(deleted.data)
    reFetch()
    //navigate("/admin/dash")
   }

   if(e.target.name === "view"){
      try {
        const user=data.find(user=>user._id===personid)
        setperson(user)
        setShow(true)
      } catch (error) {
        Handelalert("error Occured Unable to View")
      }
   }

   if(e.target.name==="admin"){
    try {
      console.log(e.target.getAttribute("data-status"))
      const modify_admin = await axios.put(`http://localhost:5000/user/admin_access/${personid}`,
      {isAdmin:e.target.getAttribute("data-status")},
    {
      headers:{
          authorization:sessionStorage.getItem("token")
      }
     });
    
    Handelalert(modify_admin.data)
    reFetch()  
    } catch (error) {
      Handelalert("error Occured Unable to modify admin access")
    }
   }
  }
  return (
    <>
    <Error message={err} setopen={setopen} open={open} />
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">User</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Email</TableCell>
              <TableCell className="tableCell">Phone</TableCell>
              <TableCell className="tableCell"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <>
              {(user._id != checkUser._id) &&(
                <TableRow key={user._id}>
                <TableCell className="tableCell">
                <div className="cellWrapper">
                    {user.img.length>0 && (<img src={user.img} alt="" className="image" />)}
                    {user.isAdmin ? <RiUserStarFill/> : <RiUserFill/>}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{user.username}</TableCell>
                <TableCell className="tableCell">{user.email}</TableCell>
                <TableCell className="tableCell">{user.phone}</TableCell>
                <TableCell className="tableCell" >
                  <ButtonGroup id={user._id} >
                    <Button
                      name="delete"
                      variant="outline-danger"
                      onClick={(e) => handelChange(e)}
                    >Delete</Button>
                    <Button
                      name="view"
                      variant="outline-info"
                      onClick={handelChange}
                    >View</Button>
                    {/* <Button
                      data-status={user.isAdmin}
                      name="admin"
                      variant={user.isAdmin?"outline-dark":"outline-success"}
                      onClick={handelChange}
                    >{user.isAdmin ? "Remove Admin" :"Make Admin"}</Button> */}
                  </ButtonGroup>
                </TableCell>
              </TableRow>
              )}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {person &&
        <Offcanvas show={show} onHide={handleClose} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="m-4">
          <Card >
            <Figure className="m-4">
              <Figure.Image
                width={100}
                height={100}
                roundedCircle
                src={person.img}
              />
              <Figure.Caption>User : {person.username} </Figure.Caption>
            </Figure>
            <Card.Header>Email :{person.email} </Card.Header>
            <Card.Body>
              <Card.Text>Phone Number : {person.phone}</Card.Text>
              <Card.Text>City : {person.city}</Card.Text>
              <Card.Text>Country : {person.country} </Card.Text>
              {/* <Card.Text> Rooms :rooms</Card.Text> */}
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
      }
    </>
  );
};

export default UsersTable;
