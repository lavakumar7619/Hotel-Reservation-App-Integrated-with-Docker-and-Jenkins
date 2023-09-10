import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { ImLocation2 } from "react-icons/im";
import { GiPathDistance, GiAerialSignal } from "react-icons/gi";
import { FaHotel } from 'react-icons/fa'
import { MdOutlineSubtitles } from 'react-icons/md'
import Loading from '../../utils/loading'
import Carousel from 'react-bootstrap/Carousel';
import useErrorDisplay from "../../hooks/useErrorDisplay";
import Error from "../../utils/Error";

const Hotel = () => {
  const {Handelalert,seterror,open,setopen,error:err}=useErrorDisplay()
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`${process.env.REACT_APP_BASE_URL}/hotels/find/${id}`);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }


  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      {error && (<Error message={err} setopen={setopen} open={open} />)}
      <Navbar />
      <Header type="list" />
      {loading ? (
        <Loading />
      ) : (
        <div className="m-4 p-4 hotelContainer">

          <div className="hotelWrapper">
            <h5 className="p-2 bookNow"><GiAerialSignal /> its {data.type} {data.featured && <p>and Featured one</p>}</h5>
            <h1 className="hotelTitle"><FaHotel /> {data.name}</h1>
            <span><ImLocation2 /> {data.address}</span>
            <span className="hotelDistance">
              <GiPathDistance /> Excellent location – {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <Carousel className="m-4" activeIndex={index} onSelect={handleSelect}>
              {data.photos?.map((photo, i) => (
                <Carousel.Item key={i}>
                  <img
                    className="rounded fluid d-block w-100"
                    src={photo}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                  <h1 className="hotelTitle"><MdOutlineSubtitles /> {data.title}-{data.city}</h1>
                    <h3>Photo {i+1}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle"><MdOutlineSubtitles /> {data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days +1}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                {/* <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2> */}
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>

        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} days={days} hotelId={id} />}
    </div>
  );
};

export default Hotel;
