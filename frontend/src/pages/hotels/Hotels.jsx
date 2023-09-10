import { useLocation} from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar"
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';

const Hotels = () => {
    const location = useLocation();

    const [Type, setType] = useState(location.state);

    const { data, loading, error } = useFetch(
        `${process.env.REACT_APP_BASE_URL}/hotels/getType?type=${Type}`
    );

    return (
        <div >
            <Navbar />
            {loading ? (
                <h2 className="m-4">Loading please wait</h2>
            ) : (
                <>
                    {data.length == 0 ? (<h1 className="m-4">No Data Found</h1>) : (
                        <>
                            {data.map((hotel) => (
                                <Card key={hotel._id} className="m-4">
                                    <Card.Body >
                                        <Row>
                                            <Col md={4}>
                                                <Figure>
                                                    <Figure.Image
                                                        width={280}
                                                        height={180}
                                                        alt="171x180"
                                                        src={hotel.photos[0]}
                                                    />
                                                    <Figure.Caption>{hotel.city} - {hotel.distance} meters</Figure.Caption>
                                                </Figure>
                                            </Col>
                                            <Col md={8}>
                                                <Card.Title>{hotel.name} - {hotel.rating}</Card.Title>
                                                <Card.Text>{hotel.title}</Card.Text>
                                                <Card.Text> {hotel.desc} </Card.Text>
                                                <Card.Text>Address : {hotel.address}</Card.Text>
                                                <Card.Text>cheapestPrice- ₹{hotel.cheapestPrice}  </Card.Text>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            ))}
                        </>
                    )}

                </>
            )}
        </div>

    )
}



export default Hotels;