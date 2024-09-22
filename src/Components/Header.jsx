import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (

    <>
   
      <nav className=" p-2  d-flex justify-content-between" style={{backgroundColor:'black'}}>
     <div className=" navbar container-fluid p-0">
   <Link to={'/'} style={{textDecoration:"none"}}>
      <a className="navbar-brand ms-3 "  href="#" >
        <img src="https://i.pinimg.com/736x/b4/e8/0e/b4e80e3c887b4c3708340214158e2962.jpg" alt="Logo" width="50" height="50" class="d-inline-block " style={{borderRadius:'100px'}}/>
        <span className='mt-5 ms-2 text-dark   ' ><b>Gallery<span className='text-info'>Gleam<i className="fa-solid fa-camera" /></span></b></span>
      </a>
   </Link>
    

  </div>
    <div className='navbar me-5'>
   <Link to={'/faav'}> <i className="fa-solid fa-heart text-info "    /></Link>
    </div>
    </nav>
    </>
  )
}

export default Header
