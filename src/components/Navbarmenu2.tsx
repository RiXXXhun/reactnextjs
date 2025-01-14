"use client"

import { Button, Container, Form, FormControl, Nav, NavDropdown, Offcanvas } from "react-bootstrap"
import Navbar from "react-bootstrap/esm/Navbar"

export default function Navbarmenu2(){
    return (
        <>  
     <Navbar bg="light" expand={false}>  
  <Container fluid>  
    <Navbar.Brand href="#">Navbar Brand</Navbar.Brand>  
    <Navbar.Toggle aria-controls="offcanvasNavbar" />  
    <Navbar.Offcanvas  
      id="offcanvasNavbar"  
      aria-labelledby="offcanvasNavbarLabel"  
      placement="end"  
    >  
      <Offcanvas.Header closeButton>  
        <Offcanvas.Title id="offcanvasNavbarLabel">Sidebar</Offcanvas.Title>  
      </Offcanvas.Header>  
      <Offcanvas.Body>  
        <Nav className="justify-content-end flex-grow-1 pe-3">  
          <Nav.Link href="#action1">Sidear Item1</Nav.Link>  
          <Nav.Link href="#action2">Sidebar Item 2</Nav.Link>  
          <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">  
            <NavDropdown.Item href="#action3">Dropdown Item 1</NavDropdown.Item>  
            <NavDropdown.Item href="#action4">Dropdown Item 2</NavDropdown.Item>  
            <NavDropdown.Divider />  
            <NavDropdown.Item href="#action5">  
              Divided Item  
            </NavDropdown.Item>  
          </NavDropdown>  
        </Nav>  
        <Form className="d-flex">  
          <FormControl  
            type="search"  
            placeholder="Search"  
            className="me-2"  
            aria-label="Search"  
          />  
          <Button variant="outline-success">Search</Button>  
        </Form>  
      </Offcanvas.Body>  
    </Navbar.Offcanvas>  
  </Container>  
</Navbar>  
    </>  
    )
}