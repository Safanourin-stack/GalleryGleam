import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addPhotoApi } from '../services/allApis';
import Userphoto from '../Components/Userphoto';
import { addrespcontext } from '../Components/Context_Api/ContextShare';
import { useContext } from 'react';

function Display() {
  const [show, setShow] = useState(false);
  const {addresponse,setaddresponse} =useContext(addrespcontext)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [addPic, setaddPic] = useState({
    title: "", ImageUrl: ""
  })
  console.log(addPic);
  const [name, setname] = useState('')

  const [imgStatus, setimgStatus] = useState(false)
  const [preview, setpreview] = useState("")



  useEffect(() => {
    if (addPic.ImageUrl.type != 'image/jpg' && addPic.ImageUrl.type != 'image/png' && addPic.ImageUrl.type != 'image/jpeg') {
      console.log("invalid file type", addPic.ImageUrl.type);
      setimgStatus(false)
      setaddPic({
        title: "", ImageUrl: ""
      })
      setpreview("")
    }
    else {
      console.log("valid file type");
      setimgStatus(true)
      setpreview(URL.createObjectURL(addPic.ImageUrl))
    }

  }, [addPic.ImageUrl])

  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setname(sessionStorage.getItem("username"))
    }
    else {
      setname('username')
    }
  }, [])

  const handleAddpic = async () => {

    const { title, ImageUrl } = addPic
    if (!title || !ImageUrl) {

      toast.warning("fill form with valid data")

    }
    else {
      const formdata = new FormData()
      formdata.append("title", title)
      formdata.append("ImageUrl", ImageUrl)

      const token = sessionStorage.getItem("token");
      const header = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Optional; Axios usually handles this automatically
      };

      const res = await addPhotoApi(formdata, header)

      console.log(res);

      if (res.status === 201) {
        toast.success("photo added Successfully!!")
        handleClose()
        setaddPic({
          title: "", ImageUrl: ""
        })
        setaddresponse(res)
        setpreview("")
      }
      else {
        toast.error("Photo Adding Failed!!" + res.response.data)
      }

    }
  }


  return (
    <div className=''>
      <Header />
      <h5 className='text-info' >Welcome {name}</h5>
      <div className='bg-light container p-4 rounded shadow my-5'>
        <h5 className='text-dark'><b> Add Photos</b></h5>
        <button className='btn btn-info' onClick={handleShow}>Add to Gallery</button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Add photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form>

              <div >
                <div className='row'>
                  <div className='col-5 '>
                    <img src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9wnOu7L7O2wBt4SnWxhER3nF_LV9p2KRIg&s"} className='w-100' alt="" />
                  </div>
                  <div className='col-7'>
                    <Form.Group className="mb-2" controlId="formtitle">

                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" placeholder="title" onChange={(e) => { setaddPic({ ...addPic, title: e.target.value }) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formfile">
                      <Form.Label>ImageUrl</Form.Label>
                      <Form.Control type="File" placeholder="ImageUrl" onChange={(e) => { setaddPic({ ...addPic, ImageUrl: e.target.files[0] }) }} name="ImageUrl" />


                      {


                        !imgStatus &&
                        <p className='text-danger'>Invalid file type </p>

                      }
                    </Form.Group>
                  </div>
                </div>
              </div>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="info" onClick={handleAddpic} >Add</Button>
          </Modal.Footer>
        </Modal>

        <Userphoto v={addPic} imgStatus={imgStatus} />
     
      </div>

     

    </div>
  )
}

export default Display
