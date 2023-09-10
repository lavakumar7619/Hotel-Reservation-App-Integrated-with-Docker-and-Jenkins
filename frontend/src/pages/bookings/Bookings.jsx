import Navbar from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Loading from '../../utils/loading'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import useErrorDisplay from "../../hooks/useErrorDisplay";
import Error from "../../utils/Error";
import StripeCheckout from 'react-stripe-checkout';
import { Navigate } from "react-router-dom";

const stripePublicKey = "pk_test_51JMG5lSIAxlCeZwx3N3jTlrTYzbvQMesUcwJoGGOa4I8pFAUKZs0qdB9ONxO7gw17LPRNWBfN0cQ0vhxhk6DJPSA00PXrAY8qJ"

const Bookings = () => {
    const { Handelalert, seterror, open, setopen, error: err } = useErrorDisplay()
    const { user } = useContext(AuthContext);
    const { data, loading, reFetch } = useFetch(`${process.env.REACT_APP_BASE_URL}/rooms/user/${user._id}`);
    const [value, setValue] = React.useState(4);
    // const {data1}=useFetch(`http://localhost:5000/rooms/user/${}`)
    // useEffect(() => {

    // })
    const [hnames,sethnames]=useState([])
    const hotel_names=async(e)=>{
        const get_hotels=await axios.get(`${process.env.REACT_APP_BASE_URL}/hotels/all`)
        sethnames(get_hotels.data)
    }
    hotel_names()
    const handelVaccate = async (e) => {
        const roomid = e.target.parentElement.dataset.roomid
        console.log(roomid);
        try {
            const vacated = await axios.put(`${process.env.REACT_APP_BASE_URL}/rooms/vacate/${roomid}`,{isClean:false,status:true})
            Handelalert(vacated.data)
            reFetch()
        } catch (error) {
            Handelalert("Error in vacting room")
        }
    }
    const handelCancel = async (e) => {

        const roomid = e.target.parentElement.dataset.roomid
        console.log(roomid);
        try {
            const vacated = await axios.put(`${process.env.REACT_APP_BASE_URL}/rooms/vacate/${roomid}`,{isClean:true,status:false})
            Handelalert("Room Booking Canceled")
            reFetch()
        } catch (error) {
            Handelalert("Error in room cancling")
        }
    }
    const showStripe = async(e) => {
        console.log(e); 
        try {
            const payment = await axios.put(`${process.env.REACT_APP_BASE_URL}/rooms/payment/${user._id}`,{payment:true,data:e}) 
            Handelalert(payment.data)
            reFetch()
        } catch (error) {
            Handelalert("Payment Failed")
            reFetch()
        }

    }
    return (
        <div>
            <script src="http://checkout.stripe.com/checkout.js" defer></script>
            <Error message={err} setopen={setopen} open={open} />
            <Navbar />
            {loading && (<Loading />)}
            {data.length > 0 ? (
                <TableContainer component={Paper} className="mt-2 table">
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {/* <TableCell className="tableCell">Hotel</TableCell> */}
                                <TableCell className="tableCell">Room</TableCell>
                                <TableCell className="tableCell">Total Price</TableCell>
                                <TableCell className="tableCell">Rating</TableCell>
                                <TableCell className="tableCell"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((room) => (
                                <TableRow key={room._id}>
                                    {/* <TableCell className="tableCell">H name</TableCell> */}
                                    <TableCell className="tableCell">{room.title}</TableCell>
                                    <TableCell className="tableCell">{room.booked.unavailableDates.length} days * Rs {room.price} = Rs {room.booked.unavailableDates.length * room.price}</TableCell>
                                    <TableCell className="tabelCell">
                                        {/* <Typography component="legend">Rating </Typography> */}
                                        <Rating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={async (event, newValue) => {
                                                setValue(newValue);
                                                console.log(value);
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="tableCell" >
                                        <ButtonGroup data-roomid={room._id}>
                                            {room.booked.payment ?(
                                                <Button
                                                    name="vacate"
                                                    variant="warning"
                                                    onClick={handelVaccate}
                                                >Vaccate</Button>
                                            ):(
                                                <>
                                                <Button
                                                name="cancel"
                                                variant="danger"
                                                onClick={handelCancel}
                                                className="mr-2"
                                            >Cancel</Button>
                                            <StripeCheckout
                                                token={showStripe}
                                                name="Book-Karo" 
                                                description="Payment for room Booking"
                                                stripeKey={stripePublicKey}
                                                panelLabel="Total Amount"
                                                currency="INR"
                                                email={user.email}
                                                allowRememberMe={true}
                                                amount={room.booked.unavailableDates.length * room.price * 100} />
                        
                                                </>
                                            )
                                            }
                                            </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (<h1 className="m-5 p-4 bg-danger">No Bookings Avilable...Book Room</h1>)}
        </div>
    )
}

export default Bookings;