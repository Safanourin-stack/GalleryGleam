import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';

import { Link } from 'react-router-dom';

function Home() {
  const [logstatus, setLogStatus] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogStatus(true);
    } else {
      setLogStatus(false);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="marquee-container bg-light"  >
  <marquee behavior="scroll" direction="left" scrollamount="6">
   <b> Welcome to GalleryGleam! Discover amazing galleries and stunning photographs<i className="fa-solid fa-heart text-info " ></i></b>
  </marquee>
</div>
      < >
       <div className='mb-5 d-flex justify-content-center align-items-center mt-5 w-100 container'>
          <div className='row rounded p-5 bg-light'>
            <div className='col-7 mt-5'>
              <h3>Gallery<span className='text-info'>Gleam<i className="fa-solid fa-camera" /></span></h3>
              <p style={{ textAlign: 'justify' }}>
              Gallery Gleam is a vibrant and dynamic photo gallery platform designed to showcase images in an elegant and user-friendly manner. It offers features like image uploads, search, and the ability to mark favorite photos, making it perfect for personal or professional portfolios
              </p>
              {logstatus ? (
                <Link to={'/dis'}>
                  <button className='btn btn-info'>Go to Dashboard</button>
                </Link>
              ) : (
                <Link to={'/log'}>
                  <button className='btn btn-info'>Start to explore</button>
                </Link>
              )}
            </div>
            <div
              className='col-5 p-5'
              style={{
                backgroundImage: 'url(https://cdn.taggbox.com/v7/taggbox.com/blog/wp-content/uploads/2023/09/embed-photos-on-website-1024x529.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
          </div>
  
       </div>
        
        <div className='text-center my-5 w-50 container'> <Link to={'/fav'}> <button className='btn btn-info w-100'><b>view gallery</b></button></Link></div>
        
        <div className='my-5 w-75 container'>
         <h4 className='text-center' ><b>F <i className="fa-brands fa-edge"></i> atures</b></h4>
     <div className='d-flex '>
        <div className='w-100 mx-2'>
          <img src="https://cdn.dribbble.com/users/1303415/screenshots/3832421/freephotoapp_min.gif" alt="" height="300px" className='w-100'/>
        </div>
        <div className='w-100 mx-2'>
          <img src="https://cdn.dribbble.com/users/418188/screenshots/2182940/media/2d45f7985130aee3af073744571f02b5.gif"  height="300px" alt="" className='w-100' />
        </div>
        <div className='w-100 mx-2'>
          <img src="https://i.pinimg.com/originals/0a/b2/cb/0ab2cb8c7bc008f3b8b91a4b352c55f2.gif" alt=""  height="300px" className='w-100' />
        </div>
     </div>
        </div>
      </>

     
    </>
  );
}

export default Home;
