import React, { useEffect, useState } from 'react';
import { getAllPhotoApi } from '../services/allApis';
import base_url from '../services/base_url'; // Assuming this is defined
import Header from '../Components/Header';


function FavoritePhoto() {
  const [pic, setPic] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getData();
    } else {
      alert('Please log in');
    }
  }, []);

  // Fetch photos from API
  const getData = async () => {
    const res = await getAllPhotoApi();
    if (res.status === 200) {
      const storedFavorites = JSON.parse(localStorage.getItem("Favorites")) || [];
      // Filter photos based on their IDs
      const favoritePics = res.data.filter(photo => 
        storedFavorites.includes(photo._id)
      );
      setPic(favoritePics); // Set the favorite photos to state
    } else {
      console.log(res);
    }
  };

  return (
    <div className=' '>
      <Header/>
      <h3 className='text-center my-5'><b>Favorite Pictures <i className="fa-solid fa-heart text-info " ></i></b></h3>
      <div className='container w-100 my-5'>
        {pic.length > 0 ? (
          pic.map((image) => (
            <img 
              key={image._id} 
              src={`${base_url}/Uploads/${image.ImageUrl}`} 
              alt={image.title} 
              style={{ width: "220px", height: "200px", margin: "15px" }}
            />
          ))
        ) : (
          <p>No favorites yet!</p>
        )}
      </div>
    </div>
  );
}

export default FavoritePhoto;
