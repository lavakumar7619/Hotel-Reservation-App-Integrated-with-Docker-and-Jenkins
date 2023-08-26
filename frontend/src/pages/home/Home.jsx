import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Header from "../../components/header/Header";
import Carousel from 'react-bootstrap/Carousel';
import "./home.css";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import io from "socket.io-client";
import { useEffect, useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
const socket = io.connect("http://localhost:5000");
const Home = () => {
    const coursel = [
        {
            src: "https://www.google.com/maps/vt/data=CGBvIQnd56yBF_c-8A4Fl3jX3ValwpKNnQSQ6Fz9lLEuKxww1LNRyJdHwNIlZv7hnDzh4NpOJQ-U7-6FmRqwcJHZf-fzQLowhjDZ-r_X9CRbkYVtqQYLpMhQ_WnylXLh5RwQ3jvzm1bCc40FaY_Ne3DB6iRlSvBKz3MyUmwFC9mOdjuxxLpuikZl4VYXstdGu4MeADvP5Oc2lp4hKT3HoRgCB9SM10xJTgA-kp5-cKPg2Edzx33NwxR_lvqwrhowIw&w=183&h=160"
            , note: "your welcome"
        },
        {
            src: "https://www.google.com/maps/vt/data=CGBvIQnd56yBF_c-8A4Fl3jX3ValwpKNnQSQ6Fz9lLEuKxww1LNRyJdHwNIlZv7hnDzh4NpOJQ-U7-6FmRqwcJHZf-fzQLowhjDZ-r_X9CRbkYVtqQYLpMhQ_WnylXLh5RwQ3jvzm1bCc40FaY_Ne3DB6iRlSvBKz3MyUmwFC9mOdjuxxLpuikZl4VYXstdGu4MeADvP5Oc2lp4hKT3HoRgCB9SM10xJTgA-kp5-cKPg2Edzx33NwxR_lvqwrhowIw&w=183&h=160"
            , note: "your welcome"
        },
        {
            src: "https://www.google.com/maps/vt/data=CGBvIQnd56yBF_c-8A4Fl3jX3ValwpKNnQSQ6Fz9lLEuKxww1LNRyJdHwNIlZv7hnDzh4NpOJQ-U7-6FmRqwcJHZf-fzQLowhjDZ-r_X9CRbkYVtqQYLpMhQ_WnylXLh5RwQ3jvzm1bCc40FaY_Ne3DB6iRlSvBKz3MyUmwFC9mOdjuxxLpuikZl4VYXstdGu4MeADvP5Oc2lp4hKT3HoRgCB9SM10xJTgA-kp5-cKPg2Edzx33NwxR_lvqwrhowIw&w=183&h=160"
            , note: "your welcome"
        }
    ]
    const [notifyRecived, setnotifyRecived] = useState("")
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    useEffect(() => {
        socket.on("recive_notification", (data) => {
            setnotifyRecived(data.notification)
            setShowA(true)
        })
    })

    return (
        <div>
            <Navbar />
            <ToastContainer position="top-end" className="p-3">
                <Toast 
                onClose={toggleShowA} 
                show={showA} 
                bg="secondary" >
                    <Toast.Header >
                        <NotificationsNoneOutlinedIcon />
                        <strong className="me-auto">Book-Karo</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{notifyRecived}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Header />
            <div>
            {coursel.map((img) => {                     
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={img.src}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h1>{img.note}</h1>
                                <h2>0 Properties</h2>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                })}
            </div>
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">Browse by property type</h1>
                <PropertyList />
                
            </div>
        </div>
    );
};

export default Home;
