import Navbar from "../../components/navbar/Navbar";
import UsersTable from "../../components/table/UsersTable"
import HotelsTable from "../../components/table/HotelsTable"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../utils/loading";
import Button from 'react-bootstrap/Button';
import RoomsTable from "../../components/table/RoomsTable";
import { MDBContainer, MDBCard, MDBCardBody, MDBTextArea } from 'mdb-react-ui-kit';
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect("http://localhost:5000");
const Home = () => {
    const [notify, setnotify] = useState("")
    const onSubmit = () => {
        socket.emit("send_notification", { notification: notify })
    }
    const [key, setKey] = useState('hotels');

    const navigate = useNavigate()

    const onclick = () => { navigate(`/admin/${key}`) }
    return (<>
        <Navbar />
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => {
                setKey(k)
            }
            }
            className="m-2"
        >
            <Tab eventKey="user" title="Users">

                <UsersTable />

            </Tab>
            <Tab eventKey="hotels" title="Hotels">
                <>
                    <div className="d-grid gap-2 m-2 p-2 ">
                        <Button
                            variant="success"
                            size="lg"
                            onClick={onclick}
                        >
                            Add {key}
                        </Button>
                    </div>
                    <HotelsTable />
                </>

            </Tab>
            <Tab eventKey="notify" title="Offers">
                <MDBContainer className='m-4 align-items-center justify-content-center' >
                    <MDBCard className='m-2' >
                        <MDBCardBody className='px-4'>
                            <MDBTextArea autoFocus style={{ height: "400px" }} wrapperClass='mb-2' size='lg' type='text' onChange={(e) => setnotify(e.target.value)} placeholder="Combo offers for family 75% boost bonus....." />
                            <Button className='mb-2 w-100 gradient-custom-4' size='lg' onClick={onSubmit}>Release Offer</Button>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </Tab>
            <Tab eventKey="rooms" title="Rooms">
                <RoomsTable/>
            </Tab>
            <Tab eventKey="travel" title="Travel" disabled>
                <RoomsTable/>
            </Tab>
            <Tab eventKey="movies" title="Movies" disabled>
                <RoomsTable/>
            </Tab>
            <Tab eventKey="analysis" title="Analysis" disabled>
                <RoomsTable/>
            </Tab>
        </Tabs>
    </>)
};

export default Home;