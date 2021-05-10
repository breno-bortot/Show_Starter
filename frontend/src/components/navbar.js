import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const NavBar = () => {

    return (
        <>

            <Navbar collapseOnSelect bg="light" expand="lg" >
                <Container className='d-flex justify-content-between'>

                    <Navbar.Brand className='brand' href="/">Show Starter</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav variant='tabs' className="mr-auto" as="ul">

                            <Nav.Link className='bg-danger'>
                                <Link className='text-decoration-none text-white' to="/projects"><li>Find Show Projects</li></Link>
                            </Nav.Link>
                            <Nav.Link className='bg-success'>
                                <Link className='text-decoration-none text-white' to="/reg_creator"><li>Register Creator Account</li></Link>
                            </Nav.Link>
                            <Nav.Link className='bg-success'>
                                <Link className='text-decoration-none text-white' to="/reg_supporter"><li>Register Supporter Account</li></Link>
                            </Nav.Link>
                            <Nav.Link className='bg-info'>
                                <Link className='text-decoration-none text-white' text-secondary to="/creators"><li>Creator Page</li> </Link>
                            </Nav.Link>
                            <Nav.Link className='bg-info'>
                                <Link className='text-decoration-none text-white' to="/supporters
                                "><li>Supporter Page</li> </Link>
                            </Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}

export default NavBar;