import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <>
 
  <footer className="text-center text-lg-start  text-muted " style={{backgroundColor:'black'}}>
    
    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
     
      <div className="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>
      
      <div>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-facebook-f" />
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-twitter" />
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-google" />
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-instagram" />
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-linkedin" />
        </a>
        <a href="" className="me-4 text-reset">
          <i className="fab fa-github" />
        </a>
      </div>
      
    </section>
   
    <section className="">
      <div className="container text-center text-md-start mt-5">
       
        <div className="row mt-3">
          
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
           
            <h6 className="text-uppercase fw-bold mb-4">
              <i className="fas fa-gem me-3" />
              Gallery Gleam
            </h6>
            <p>
              Store photos
            </p>
          </div>
         
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          
            
            <h6 className="text-uppercase fw-bold mb-4">Links</h6>
            <p>
            <Link to={'/'} style={{textDecoration:'none'}}>

                <p className="text-reset">
                 Home
                </p>
             </Link>
             </p>
            <p>
             <Link to={'/dis'} style={{textDecoration:'none'}}>
                <p  className="text-reset">
                  Dashboard
                </p>
             </Link>
            </p>
            <p>
              <Link to={'/fav'} style={{textDecoration:'none'}}>
                <p className="text-reset">
                  Gallery
                </p>
              </Link>
            </p>
           
            <p>
             <Link to={'/faav'} style={{textDecoration:'none'}}>
                <p  className="text-reset">
                  Favorate
                </p>
             </Link>
            </p>
          </div>
          
         
          
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <p>
              <i className="fas fa-home me-3" /> Kerala, India
            </p>
            <p>
              <i className="fas fa-envelope me-3" />
              GalleryGleam@gamil.com
            </p>
            <p>
              <i className="fas fa-phone me-3" /> + 01 234 567 88
            </p>
            <p>
              <i className="fas fa-print me-3" /> + 01 234 567 89
            </p>
          </div>
        
        </div>
        
      </div>
    </section>
   
    <div
      className="text-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
    >
      © 2021 Copyright:
      <span className="text-reset fw-bold" >
        GalleryGleam
      </span>
    </div>
    
  </footer>
  
</>

    </>
  )
}

export default Footer
