import "./newHotel.scss";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Loading from "../../utils/loading";
import useErrorDisplay from "../../hooks/useErrorDisplay";
import Error from "../../utils/Error";
const NewHotel = () => {
    const {Handelalert,seterror,open,setopen,error:err}=useErrorDisplay()
    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [adding,setAdding]=useState(false)

    const navigate = useNavigate()
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setAdding(true)
         try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/dzrbcb2gv/image/upload",
                        data

                    );
                    //take url from drive
                    const { url } = uploadRes.data;
                    return url;
                })
            );

            const newhotel = {
                ...info,
                photos: list,
            };
           await axios.post(`${process.env.REACT_APP_BASE_URL}/hotels`, 
           newhotel,
           {
            headers:{
                authorization:sessionStorage.getItem("token")
            }
           }
           );
           setAdding(false)
            Handelalert("added succesfuly")
           navigate("/admin/dash")
        } catch (err) { 
            setAdding(false)
            Handelalert("failed to create hotel")
        }
    };
    return (
        <div className="new">
            <Error message={err} setopen={setopen} open={open} />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Hotel</h1>
                </div>
                {(adding)?(
                <Loading/>
            ):(<>
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
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    style={{ display: "none" }}
                                />
                            </div>
                            {hotelInputs.map((input) => (
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
                            <div className="formInput">
                                <label>Featured</label>
                                <Form.Select id="featured" onChange={handleChange}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </Form.Select>
                            </div>
                            <div className="formInput">
                                <label>Type</label>
                                <Form.Select id="type" onChange={handleChange}>
                                    <option value="hotel" >hotel</option>
                                    <option value="apartment">apartment</option>
                                    <option value="resort">resort</option>
                                    <option value="cabin">cabin</option>
                                    <option value="villa">villa</option>
                                </Form.Select>
                            </div>
                            <button onClick={handleClick}>Send</button>
                        </form>
                    </div>
                    
                </div>
                </>)}
            </div>
        </div>
    );
};

export default NewHotel;
