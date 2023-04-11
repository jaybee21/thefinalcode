import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function CustomNavBar({ title, children }) {
    return (
        <Navbar variant="light" className="border-bottom mb-4">
            <Container>
                <Navbar.Brand>{title}</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end mr-auto">
                    {children}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavBar;
