import React, { useEffect, useState, useContext } from 'react';
import { dltphotoApi, editphotoApi, getUserPhotoApi } from '../services/allApis';
import base_url from '../services/base_url';
import { Row, Col } from 'react-bootstrap';
import { addrespcontext } from './Context_Api/ContextShare';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function UserPhoto() {
  const [userPhotos, setUserPhotos] = useState([]);
  const { addresponse, setaddresponse } = useContext(addrespcontext);
  const [imgStatus, setimgStatus] = useState(false);
  const [preview, setpreview] = useState("");
  const [show, setShow] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [addPic, setaddPic] = useState({ title: '', ImageUrl: '' });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      getData(token);
    }
  }, [addresponse]);

  const getData = async (token) => {
    const header = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const res = await getUserPhotoApi(header);
      if (res.status === 200) {
        setUserPhotos(res.data);
      } else {
        console.error('Failed to fetch photos:', res);
      }
    } catch (error) {
      console.error('Error fetching user photos:', error);
    }
  };

  const handleShow = (photo) => {
    setShow(true);
    setCurrentId(photo._id);
    setaddPic({ title: photo.title, ImageUrl: '' }); // Populate form with current photo details
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (addPic.ImageUrl && addPic.ImageUrl.type) {
      const validTypes = ['image/jpg', 'image/png', 'image/jpeg'];
      setimgStatus(validTypes.includes(addPic.ImageUrl.type));
      if (validTypes.includes(addPic.ImageUrl.type)) {
        setpreview(URL.createObjectURL(addPic.ImageUrl));
      } else {
        setpreview("");
        setaddPic({ title: "", ImageUrl: "" });
      }
    }
  }, [addPic.ImageUrl]);

  const dltphoto = async (id) => {
    const token = sessionStorage.getItem('token');
    const header = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const res = await dltphotoApi(id, header);
    if (res.status === 200) {
      toast.success('Photo deleted!');
      getData(token); // Fetch updated data
    } else {
      toast.error('Deletion failed');
    }
  };

  const Editphoto = async () => {
    const { title, ImageUrl } = addPic;

    if (!title || !ImageUrl) {
      toast.warning("Please fill in all fields with valid data.");
      return;
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("ImageUrl", ImageUrl);

    const token = sessionStorage.getItem('token');
    const header = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const result = await editphotoApi(currentId, formdata, header);
      if (result.status === 200) {
        toast.success('Photo updated successfully!');
        handleClose();
        setpreview("")
        getData(token); // Fetch updated data
      } else {
        toast.error("Photo update failed.");
        console.log(result);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating photo.");
    }
  };

  return (
    <div className="my-2 p-2 w-100">
      {userPhotos.length > 0 ? (
        <Row className="g-3">
          {userPhotos.map((item) => (
            <Col key={item._id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <div className="photo-container bg-secondary rounded shadow-lg p-2">
                <img
                  src={`${base_url}/Uploads/${item.ImageUrl}`}
                  alt={item.title}
                  style={{ height: '200px' }}
                  className="img-fluid w-100"
                />
                <div className="d-flex justify-content-between mt-2">
                  <h6 className="text-white">{item.title}</h6>
                  <div className="d-flex">
                    <button className="btn btn-light mx-1" onClick={() => dltphoto(item._id)}>
                      <i className="fa-regular fa-trash-can" style={{ color: '#f70808' }} />
                    </button>
                    <button className="btn btn-light" onClick={() => handleShow(item)}>
                      <i className="fa-regular fa-pen-to-square" style={{ color: '#fafafa' }} />
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <h4 className="text-center my-5">No photos added yet!</h4>
      )}

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-5">
                <img
                  src={preview || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo9wnOu7L7O2wBt4SnWxhER3nF_LV9p2KRIg&s'}
                  className="w-100"
                  alt=""
                />
              </div>
              <div className="col-7">
                <Form.Group className="mb-2" controlId="formtitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={addPic.title}
                    onChange={(e) => setaddPic({ ...addPic, title: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formfile">
                  <Form.Label>ImageUrl</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setaddPic({ ...addPic, ImageUrl: e.target.files[0] })}
                    name="ImageUrl"
                  />
                  {!imgStatus && <p className="text-danger">Invalid file type</p>}
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" onClick={Editphoto}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserPhoto;
