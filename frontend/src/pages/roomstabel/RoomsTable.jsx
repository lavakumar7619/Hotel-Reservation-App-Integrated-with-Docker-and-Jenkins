import "../../components/table/table.scss";
import Navbar from "../../components/navbar/Navbar"
import React, { useState } from 'react';
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import { Chip, Stack, Snackbar } from "@mui/material";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from "../../utils/loading";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Rating from '@mui/material/Rating';
import useErrorDisplay from "../../hooks/useErrorDisplay";
import Error from "../../utils/Error";
const RoomsTable = () => {
  const {Handelalert,seterror,open,setopen,error:err}=useErrorDisplay()
  const facilities = ['Free-Wifi', "Hot Water"];
  const [value, setValue] = React.useState(facilities[0]);
  const location = useLocation();
  const hotelid = location.pathname.split("/")[4];
  const [alert, setalert] = useState(false)
  const [message, setmessage] = useState("")
  const [editForm, seteditForm] = useState({})
  const [getView, setgetView] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [tryy,settryy]=useState("")

  const { data, loading, error, reFetch } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/hotels/room/${hotelid}`
  );
  const handelFloorDelete = async (e) => {
    const roomID = e.target.parentElement.parentElement.parentElement.parentElement.dataset.roomid

    try {
      const deleted = await axios.delete(`${process.env.REACT_APP_BASE_URL}/rooms/${roomID}/${hotelid}`)
      Handelalert(deleted.data)
      reFetch()
    } catch (error) {
      Handelalert("deleting failed try again")
    }
  }
  const handelFloorEdit = async (e) => {
    const roomID = e.target.parentElement.parentElement.parentElement.parentElement.dataset.roomid
    setgetView(data.find(room => room._id === roomID))
    setShow(true)
  }
  const handelChangeRoom = (e) => {
    seteditForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const submitForm = async (e) => {
    const roomID = e.target.dataset.roomid
    try {
      const editdRoom = await axios.put(`${process.env.REACT_APP_BASE_URL}/rooms/${roomID}`, { editForm, value });
      setShow(false)

      reFetch()
      settryy(roomID)
      Handelalert(editdRoom.data);
    } catch (err) {
      Handelalert('Updating room failed')
    }
  }
  const handelClean = async (e) => {
    const roomid = e.target.parentElement.parentElement.dataset.roomid
    try {
      const cleanStatus = await axios.put(`${process.env.REACT_APP_BASE_URL}/rooms/object/${roomid}`, { isClean: true })
      reFetch()
      Handelalert(cleanStatus.data)
    } catch (error) {
      Handelalert("failed  to update clean status")
    }

  }
  return (
    <div className="">
      <Error message={err} setopen={setopen} open={open} />
      <Navbar />
      {loading ? (<Loading />) : (
        <Container className="m-4 ">
          <h1>hotel Rooms </h1>
          <Card >
            <Tab.Container className="m-4" id="left-tabs-example" defaultActiveKey={tryy}>
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="m-4 flex-column">
                    
                    {data.map((room) => (
                      <Nav.Item key={room._id}>
                        <Nav.Link eventKey={room._id}>{room.title}</Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content style={{ height: "550px" }}>
                    {data.map((room) => (
                      <Tab.Pane key={room._id} eventKey={room._id}>
                        <Card className="m-2">
                          <Card.Body>
                            <Row className="mb-4" data-roomid={room._id}>
                              <Col md="8">
                                <Card.Title> {room.title}</Card.Title>
                                <Card.Title><Rating name="read-only" value={room.rating} readOnly /></Card.Title>
                              </Col>
                              <Col md='2'>
                                {room.isClean ? (
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="tooltip">
                                        <strong>Cleaned</strong>.
                                      </Tooltip>
                                    }
                                  ><Badge bg="success"><h4>        </h4></Badge></OverlayTrigger>
                                ) : (
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="tooltip">
                                        <strong>Not Cleaned --Click to update status</strong>.
                                      </Tooltip>
                                    }
                                  ><Badge bg="danger" style={{ cursor: "pointer" }} onClick={handelClean}><h4>   </h4></Badge></OverlayTrigger>
                                )}
                                <span className="m-2"/>
                                <>
                                {room.booked.status ? (
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="tooltip">
                                        <strong>Room is Booked</strong>.
                                      </Tooltip>
                                    }
                                  ><Badge bg="success"><h4>        </h4></Badge></OverlayTrigger>
                                ) : (
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="tooltip">
                                        <strong>Room not booked</strong>.
                                      </Tooltip>
                                    }
                                  ><Badge bg="danger" ><h4>   </h4></Badge></OverlayTrigger>
                                )}
                                </>
                              </Col>
                              <Col md="2">
                                <Stack direction='row' spacing={1}>
                                  <Chip size="small" style={{ cursor: "pointer" }} onClick={handelFloorEdit} label="  !  " color="secondary" />
                                  <Chip size="small" style={{ cursor: "pointer" }} onClick={handelFloorDelete} label="X" color="error" />
                                </Stack>
                              </Col>
                            </Row>
                            <Row className="mb-2 mt-2">
                              <Col  ><Card.Text>price : {room.price}</Card.Text> </Col>
                              <Col  ><Card.Text>maximum people : {room.maxPeople} </Card.Text> </Col>
                            </Row>
                            <Card.Text>Description : </Card.Text>
                            <Card.Text>{room.desc}</Card.Text> 
                          </Card.Body>
                          <Card.Footer className="text-muted">
                            {room.facilities.map((facilitie,i) => (
                                <Badge key={i} className="m-2 p-1" bg="success">{facilitie} </Badge>
                            ))}
                            {}
                          </Card.Footer>
                        </Card>
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Card>
        </Container>
      )}
      {getView &&
        <Modal show={show} onHide={handleClose}>

          <Modal.Header >
            <Modal.Title>Update - {getView.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" >
                <Form.Label>Title :</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handelChangeRoom}
                  id="title"
                  placeholder={getView.title}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3" >
                    <Form.Label>Price : </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handelChangeRoom}
                      id="price"
                      placeholder={getView.price}
                      autoFocus
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" >
                    <Form.Label>max people : </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handelChangeRoom}
                      placeholder={getView.maxPeople}
                      id="maxPeople"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group
                className="mb-3"
              >
                <Form.Label>Description :</Form.Label>
                <Form.Control as="textarea" onChange={handelChangeRoom} id="desc" rows={3} placeholder={getView.desc} />
              </Form.Group>

              <Form.Group>
                <Autocomplete
                  disabled
                  value={value}
                  onChange={(event: any, newValue: string | null) => {
                    setValue(newValue);
                  }}
                  id="controllable-states-demo"
                  options={facilities}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Facilities" />}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" data-roomid={getView._id} onClick={submitForm}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );
};

export default RoomsTable;