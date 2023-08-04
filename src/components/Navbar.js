import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import "./navbar.css"

function Navbar() {

    const user = JSON.parse(localStorage.getItem('currentUser'));

    function logout() {
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid reqNav">
                    <a className="navbar-brand bold hsize" href='/'>Hotel-Booking.com</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" ></span>
                        </button>
                        {user ? (
                            <>
                                <Dropdown>
                                    <img src="https://www.pngkit.com/png/full/88-885453_login-white-on-clear-user-icon.png" alt=""></img>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {user.data.name}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>
                                        {user.data.isAdmin && (<Dropdown.Item href="/admin">Admin Panel</Dropdown.Item>)}
                                    </Dropdown.Menu>
                                </Dropdown>

                            </>) :
                            (<>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" aria-current="page" href="/login">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/register">Register</a>
                                    </li>
                                </ul>
                            </>
                            )}
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar
