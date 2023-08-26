import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import useFetch from '../../hooks/useFetch';
import React, { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
function RoomsTable() {
    const [getRoom, setgetRoom] = useState([])
    // const { data, loading, error, reFetch } = useFetch(
    //     `http://localhost:5000/rooms/all`
    //   );



    return (
        <div>
            <h3 className='m-2 p-2 bg-warning'>All Rooms</h3>
            <div className='m-2 p-2'>
                <Spinner
                    as="span"
                    animation="grow"
                    size="lg"
                    role="status"
                    aria-hidden="true"
                />  Rooms feature under devlopment....
            </div>
            <div className='m-2 p-2 bg-info rounded'>
                <Card className="m-2">
                    <Card.Header>Room -1</Card.Header>
                    <Card.Body>
                        <Card.Title>STATUS</Card.Title>
                        <Card.Text>
                            Description
                            Booked
                        </Card.Text>
                        <Button variant="success">Clean</Button>
                    </Card.Body>
                </Card>
                <Card className="m-2">
                    <Card.Header>Room -2</Card.Header>
                    <Card.Body>
                        <Card.Title>STATUS</Card.Title>
                        <Card.Text>
                            Description
                            Booked
                        </Card.Text>
                        <Button variant="success">Clean</Button>
                    </Card.Body>
                </Card>
            </div>

        </div>
    )
}

export default RoomsTable