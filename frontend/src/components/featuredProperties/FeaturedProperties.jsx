import useFetch from "../../hooks/useFetch";
//import "./featuredProperties.css";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("http://localhost:5000/hotels/getFeatured?limit=5");

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
        <h1 className="homeTitle">Homes guests love</h1>
         
            <div className="fpItem" >
              <CardGroup className="mb-4">
              {data.map((item) => (
                <Card key={item._id}>
                  <Card.Img variant="top"
                    src={item.photos[0]}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.city}</Card.Text>
                    <Card.Text>Starting from ${item.cheapestPrice}</Card.Text>
                  </Card.Body>
                </Card>
                 ))}
              </CardGroup>
            </div>
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
