import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import { Route ,Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import Display from './pages/Display'
import Fav from './pages/Fav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FavoratePhoto from './pages/FavoratePhoto'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={ <Home/>} />
      <Route path='/log' element={<Login/> } />
      <Route path='/dis' element={<Display/> } />
      <Route path='/fav' element={<Fav/> } />
      <Route path='/faav' element={<FavoratePhoto/> } />
    </Routes>
     
     <Footer/>
     <ToastContainer/>
    </>
  )
}

export default App
