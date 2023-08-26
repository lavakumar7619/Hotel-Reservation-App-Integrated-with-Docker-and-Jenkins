import React from 'react';
import { Container, Typography } from '@mui/material';
import "../errorpage/errorcode.scss"
import {GiGhost} from "react-icons/gi"
import Navbar from "../../components/navbar/Navbar"

function Error() {
    return (
        <>
            <Navbar />
            <Container>
                <Typography >
                <main className='body'>
                    <h1 className='h1'>4<span><GiGhost/></span>4</h1>
                    <h2 className='h2'>Error: 404 page not found</h2>
                    <p className='p'>Sorry, the page you're looking for cannot be accessed</p>
                    <p className='p'>If you dare,Go Back to Home</p>
                </main>
                </Typography>
            </Container>

        </>

    )
}
export default Error