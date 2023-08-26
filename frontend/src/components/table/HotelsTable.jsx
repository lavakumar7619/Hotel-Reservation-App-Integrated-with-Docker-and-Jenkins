import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from 'react-bootstrap/Button';
import React, { useState} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from "axios";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Figure from 'react-bootstrap/Figure';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useFetch from "../../hooks/useFetch";
import Loading from "../../utils/loading"
import useErrorDisplay from "../../hooks/useErrorDisplay";
import Error from "../../utils/Error";
const HotelsTable = () => {
  const {Handelalert,seterror,open,setopen,error:err}=useErrorDisplay()
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5000/hotels/all`
);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [view, setView] = useState()
  const [edit, setedit] = useState({})

  const rooms = [];
  const navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleEdit = (e) => {
    setedit((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  //buttons 
  const handelChange = async (e) => {
    const hotelid = e.target.parentElement.id

    if (e.target.name === "view") {
      const hotel= data.find(hotel=>(hotel._id===hotelid))     
      setView(hotel)
      rooms.push(hotel.rooms)
      setShow(true)
    }
    if (e.target.name === "delete") {
      const deleted = await axios.delete(`http://localhost:5000/hotels/${hotelid}`,
      {
        headers:{
            authorization:localStorage.getItem("token")
        }
       });
      Handelalert(deleted.data)
      reFetch()
    }

    if (e.target.name === "edit") {
      const hotel= data.find(hotel=>(hotel._id===hotelid))     
      setView(hotel)
      rooms.push(hotel.rooms)
      setShow2(true)
    }
  }
  //update hotel
  const handelEdit = async(e) => {
    await axios.put(`http://localhost:5000/hotels/${e.target.id}`,
    edit,
    {
      headers:{
          authorization:sessionStorage.getItem("token")
      }
     })
    .then(res=>{
      setShow2(false)
      Handelalert(res.data)
      reFetch()
    })
    .catch(err=>Handelalert("Cant update hotel Try again"))
  }
  return (
    <>
    <Error message={err} setopen={setopen} open={open} />
      <TableContainer  component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Hotel ID</TableCell>
              <TableCell className="tableCell">Hotel</TableCell>
              <TableCell className="tableCell">Title</TableCell>
              <TableCell className="tableCell">Type</TableCell>
              <TableCell className="tableCell justify-content-center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ?( <Loading/>):(
              <>
                {data.map((hotel) => (
              <TableRow key={hotel._id}>
                <TableCell className="tableCell">{hotel._id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    {hotel.photos ? (<img src={hotel.photos[0]} alt="" className="image" />) : (<></>)}
                    {hotel.name}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{hotel.title}</TableCell>
                <TableCell className="tableCell">{hotel.type}</TableCell>
                <TableCell className="tableCell">
                  <ButtonGroup id={hotel._id}>
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
                    <Button
                      name="edit"
                      variant="outline-success"
                      onClick={(e) => handelChange(e)}
                    >Edit</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {view &&
        <Offcanvas  show={show}
          onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="justify-content-center">
            <Card >
              <Figure className="m-4">
                <Figure.Image
                  width={200}
                  height={200}
                  rounded
                  src={view.photos[0]}
                />
                <Figure.Caption>{view.type} : {view.name}</Figure.Caption>
              </Figure>
              <Card.Header>Title : {view.title}</Card.Header>
              <Card.Body>
                <Card.Text>Description : {view.desc} </Card.Text>
                <Card.Text>Address : {view.address}</Card.Text>
                <Card.Text>City : {view.city}</Card.Text>
                <Card.Text>Distance : {view.distance} </Card.Text>
                <Card.Text>Cheapest Price : {view.cheapestPrice} Rs</Card.Text>
              </Card.Body>
              <Card.Footer>Rooms Avilable - {view.rooms.length}</Card.Footer>
            </Card>
          </Offcanvas.Body>
          {view.rooms.length>0 && <Button variant="outline-info rounded" onClick={(e) => navigate(`/admin/room/getrooms/${view._id}`)} className="m-2">View Rooms</Button>}
          <Button variant="outline-success rounded" onClick={(e) => navigate(`/admin/room/${view._id}`)} className="m-2 ">Add Room</Button>
        </Offcanvas>
      }
      
      {view &&
        <Modal size="lg" show={show2} >
          <Modal.Header >
            <Modal.Title>Update {view._id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Col><Form.Group className="mb-3" >
                  <Form.Label>Distance</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={view.distance}                   
                    disabled
                  />
                </Form.Group></Col>
                <Col> <Form.Group className="mb-3" >
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={view.type}
                    disabled
                  />
                </Form.Group></Col>
                <Col><Form.Group className="mb-3" >
                  <Form.Label>Featured</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="true"
                    disabled
                  />
                </Form.Group></Col>
              </Row>
              <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  placeholder={view.name}
                  onChange={handleEdit}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Titile </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={view.title}
                  onChange={handleEdit}
                  id="title"
                />
                <Row className="mb-3">
                <Col>
                  <Form.Group className="mb-3" >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      id="city"
                      placeholder={view.city}
                      onChange={handleEdit}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" >
                    <Form.Label>Cheapest Price</Form.Label>
                    <Form.Control
                      id="cheapestPrice"
                      type="number"
                      placeholder={view.cheapestPrice}
                      onChange={handleEdit}
                    />
                  </Form.Group>
                </Col>
              </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description </Form.Label>
                <Form.Control as="textarea" id="desc" onChange={handleEdit} placeholder={view.desc} rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="primary" id={view._id} onClick={handelEdit}>
              Save Hotel
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  );
};

export default HotelsTable;
