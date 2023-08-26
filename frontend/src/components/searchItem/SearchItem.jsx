import { Link } from "react-router-dom";
import "./searchItem.css";
import { AiFillDollarCircle } from "react-icons/ai";
import {ImLocation2} from "react-icons/im";
import {GiPathDistance} from "react-icons/gi";
import {FaHotel} from 'react-icons/fa'
import {MdOutlineSubtitles} from 'react-icons/md'
const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle"><FaHotel/> {item.name}</h1>
        <span ><MdOutlineSubtitles/> {item.title}</span>
        <span><ImLocation2/> {item.city}</span>
        <span ><GiPathDistance/> {item.distance}m from center</span>
        <span className="siFeatures">{item.desc}</span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice"> ₹ {item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
