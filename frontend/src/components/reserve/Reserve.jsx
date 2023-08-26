import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Error from "../../utils/Error";
import useErrorDisplay from "../../hooks/useErrorDisplay";
import LinearProgress from '@mui/material/LinearProgress';
const Reserve = ({ setOpen, hotelId,days}) => {
  const {Handelalert,seterror,open,setopen,error:err}=useErrorDisplay()
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`http://localhost:5000/hotels/room/${hotelId}`);
  
  const { dates,options } = useContext(SearchContext);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const { user } = useContext(AuthContext);
  const userid = user._id
  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = data.find(room => room._id === roomNumber).booked
    return isFound.status;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const data = await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`http://localhost:5000/rooms/availability/${roomId}`, {
            dates: alldates,
            user_id: userid
          })
          return res.data;
        })
      )
      setOpen(false);
      navigate("/bookings");
    } catch (err) {
      Handelalert("Something Happened in checking avilabity")
    }
  };
  return (
    <>
    <Error message={err} setopen={setopen} open={open} />
      {data.length > 0 &&
        <div className="reserve">
          <div className="rContainer">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="rClose"
              onClick={() => setOpen(false)}
            />
            <p>for {options.adult+options.children+options.room} people and {days+1} days</p>
            <span>Select your rooms: </span>
            <hr />
            
            {data.map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">₹ {item.price}</div>
                  <div className="rPrice">
                    <Typography component="legend">Rating </Typography>
                    <Rating name="read-only" value={item.rating} readOnly />
                  </div>
                  {!item.isClean && (<>
                    <Button className="m-2" variant="outline-danger" disabled>Cleaning Under Process............
                      {/* <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        variant="danger"
                      /> */}
                      <LinearProgress color="warning" />
                    </Button>
                  </>)}
                </div>
                <div className="rSelectRooms">
                  <input
                    type="checkbox"
                    value={item._id}
                    data-price={item.price}
                    onChange={handleSelect}
                    disabled={isAvailable(item._id)}
                  />
                </div>
              </div>
            ))}
            <button onClick={handleClick} className="rButton">
              Reserve Now!
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default Reserve;
