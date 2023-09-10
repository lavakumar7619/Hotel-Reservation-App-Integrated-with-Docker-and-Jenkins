import "../newhotel/newHotel.scss";
import * as React from 'react';
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../utils/loading";
import useErrorDisplay from "../../hooks/useErrorDisplay";
import Error from "../../utils/Error";

const NewRoom = () => {
    const {Handelalert,seterror,open,setopen,error:err}=useErrorDisplay()
    const location = useLocation();
    const hotelid = location.pathname.split("/")[3];
    const [h_name, seth_name] = useState("")
    const hotel_name=async()=>{
       try {
        const Hotel_Name=await axios.get(`${process.env.REACT_APP_BASE_URL}/hotels/find/${hotelid}`)
        seth_name(Hotel_Name.data.name)
       } catch (error) {
        seth_name("")
       }
    }
    hotel_name()
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [adding, setAdding] = useState(false)

    const navigate = useNavigate()
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setAdding(true)
        
        const newRoom={
            ...info,
            booked:{
                unavailableDates:[],
                user_id:""
            }
        }
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/rooms/${hotelid}`, 
            newRoom,
            {
                headers:{
                    authorization:sessionStorage.getItem("token")
                }
            });
            setAdding(false)
            navigate("/admin/dash")
            Handelalert('added successfuly')
        } catch (err) {
            setAdding(false)
            Handelalert("unable to create room ..error occured")
        }
    };
    return (
        <div className="new">
            <Error message={err} setopen={setopen} open={open} />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Room to {h_name} </h1>
                </div>
                {(adding) ? (
                    <Loading />
                ) : (<>
                    <div className="bottom">
                        <div className="left">
                            <img
                                src={
                                    files
                                        ? URL.createObjectURL(files[0])
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        </div>
                        <div className="right">
                            <form>
                                <div className="formInput">
                                    {/* <label htmlFor="file">
                                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                    </label> */}
                                    <input
                                        type="file"
                                        id="file"
                                        multiple
                                        disabled
                                        onChange={(e) => setFiles(e.target.files)}
                                        style={{ display: "none" }}
                                    />
                                </div>
                                {roomInputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input
                                            id={input.id}
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            required
                                        />
                                    </div>
                                ))}
                                <button onClick={handleClick} variant="Sucess">Send</button>
                            </form>
                        </div>

                    </div>
                </>)}
            </div>
        </div>
    );
};

export default NewRoom;
