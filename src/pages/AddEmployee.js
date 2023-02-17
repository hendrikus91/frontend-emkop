import React, { useState } from "react";
import { Alert, Row, Col, Container, Button } from "react-bootstrap"
import Form from 'react-bootstrap/Form';


export default function AddEmployee() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null);
    const [employee, setEmployee] = useState({ name: "", gender: "MALE", dob: "", department: "" });

    const handleChange = (event) => {
        setEmployee({ ...employee, [event.target.name]: event.target.value });
    }

    const saveEmployee = async () => {

        try {

            const response = await fetch('http://localhost:8001/api/employee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee)
            })

            const json = await response.json();

            if (json.code === 200) {
                setIsLoaded(true)
                setMessage(json.message)
            }

        } catch (error) {

        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        saveEmployee();
    }

    

    return (

        <Container style={{ paddingTop: "70px" }}>

            <Row className="justify-content-md-center">

                <Col lg="4">

                    {isLoaded ? (
                        <Alert key="success" variant="success">{message}</Alert>
                    ) : ''}



                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select name="gender" data-testid="gender" onChange={handleChange}>
                                <option  value="MALE">MALE</option>
                                <option  value="FEMALE">FEMALE</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Department</Form.Label>
                            <Form.Control type="text" name="department" data-testid="department" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dob">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control type="date" name="dob" data-testid="dob" onChange={handleChange} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}