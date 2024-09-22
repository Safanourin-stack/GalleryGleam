import React, { useContext, useEffect, useState } from 'react';
import { getAllPhotoApi } from '../services/allApis';
import base_url from '../services/base_url';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Header from '../Components/Header';
import { favadd } from '../Components/Context_Api/ContextShare';

function Fav() {
  const [pic, setPic] = useState([]);
  const [filteredPics, setFilteredPics] = useState([]);
  const [favorites, setFavorites] = useState([]); // To store favorite photos
  const [searchTerm, setSearchTerm] = useState(''); // Search term
   
  useEffect(() => {
    if(sessionStorage.getItem('token'))
    {
      getData();
    }
    else
    {
      alert('please login')
    }
   
  }, []);

  // Fetch photos from API
  const getData = async () => {
    const res = await getAllPhotoApi();
    if (res.status === 200) {
      setPic(res.data);
      setFilteredPics(res.data); // Set filteredPics initially to all photos
    } else {
      console.log(res);
    }
  };

  
  // Handle favorite toggle
const toggleFavorite = (photoId) => {
  setFavorites((prevFavorites) => {
    let updatedFavorites;
    if (prevFavorites.includes(photoId)) {
      // Remove from favorites
      updatedFavorites = prevFavorites.filter((id) => id !== photoId);
    } else {
      // Add to favorites
      updatedFavorites = [...prevFavorites, photoId];
    }

    // Save updated favorites to localStorage
    localStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
    return updatedFavorites;
  });
};

// UseEffect to load favorites from localStorage when the component mounts
useEffect(() => {
  const storedFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
  setFavorites(storedFavorites);
}, []);


  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = pic.filter((photo) =>
      photo.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPics(filtered);
  };

  return (
    <div className=' mb-4  '>
        <Header/>
     
      <Form.Group className='my-5 w-50 container'>
        <Form.Control
          type='text'
          placeholder='Search by title...'
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>

    
      {filteredPics.length > 0 ? (
        <Row className='g-5 mt-5 container-fluid p-5 '>
          {filteredPics.map((item) => (
            <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
              <div className='photo-card p-2 bg-light border'>
                <div className='img-container'>
                  <img
                    src={`${base_url}/Uploads/${item.ImageUrl}`}
                    alt={item.title}
                    className='img-fluid w-100'
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                  <p className='m-0 ' style={{fontSize:"12px"}}>{item.title}</p>
                  <Button
                    variant='link'
                    onClick={() => toggleFavorite(item._id)}
                    className='p-0'
                  >
                    <i
                      className={`fa${
                        favorites.includes(item._id) ? 's' : 'r'
                      } fa-heart`}
                      style={{ color: favorites.includes(item._id) ? 'red' : 'black' }}
                    />
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <h5>No photos available</h5>
      )}
    </div>
  );
}

export default Fav;
