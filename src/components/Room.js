import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import "./room.css";

function Room({ room, fromdate, todate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='row bs'>
            <div className='col-md-4'>
                <img src={room.imageurls[0]} className='smallimg' />
            </div>
            <div className='col-md-8  text-left'>
                <h1 className='hsize textleft'>{room.name}</h1>
                <b>
                    <p className='textleft'>Max Count : {room.maxcount}</p>
                    <p className='textleft'>Phone Number : {room.phonenumber}</p>
                    <p className='textleft'>Type : {room.type}</p>
                </b>
                <div className='btnClass'>
                    <button className='btn-primary btn' type="" onClick={handleShow}>View Details</button>
                    {(fromdate && todate) && (
                        <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                            <button className='btn-primary btn'>Book Room</button>
                        </Link>
                    )}

                </div>
            </div>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Carousel>
                        {room.imageurls.map(url => {
                            return <Carousel.Item>
                                <img
                                    className="d-block w-100 bigimg"
                                    src={url}
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        })}
                    </Carousel>
                    <p>{room.description}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Room
